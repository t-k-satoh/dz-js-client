import dotenv from 'dotenv';
import { create, _delete } from '..';
import { list } from '../../images';
import { getToken } from '../../test/get-token';
import { retrieve } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();
        const generatedTime = new Date().toUTCString();
        const name = `${process.env.ENV}-${generatedTime}-name`;
        const description = `${process.env.ENV}-${generatedTime}-description`;
        const product = false;

        const { images } = await list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const ids = images.map(image => image.imageId);

        const createRes = await create(
            {
                name,
                description,
                imageId1: ids[0],
                imageId2: ids[1],
                imageId3: ids[2],
                product,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );

        if (createRes.success) {
            const retrieveRes = await retrieve(
                { id: createRes.data.imagesGroupId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (retrieveRes.success) {
                expect(retrieveRes.success).toBe(true);
                expect(retrieveRes.data.name).toBe(name);
                expect(retrieveRes.data.description).toBe(description);
                expect(retrieveRes.data.product).toBe(product);
            }

            await _delete(
                { id: createRes.data.imagesGroupId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    });
});
