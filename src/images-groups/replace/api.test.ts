import dotenv from 'dotenv';
import { create, _delete } from '..';
import { list } from '../../images';
import { getToken } from '../../test/get-token';
import { replace } from '.';

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
            const replaceTime = new Date().toUTCString();
            const replaceName = `${process.env.ENV}-${replaceTime}-name-replace`;
            const replaceDescription = `${process.env.ENV}-${replaceTime}-description-replace`;

            const replaceRes = await replace(
                { id: createRes.data.imagesGroupId, name: replaceName, description: replaceDescription },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (replaceRes.success) {
                expect(replaceRes.success).toBe(true);
                expect(replaceRes.data.name).toBe(replaceName);
                expect(replaceRes.data.description).toBe(replaceDescription);
                expect(replaceRes.data.product).toBe(product);
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
