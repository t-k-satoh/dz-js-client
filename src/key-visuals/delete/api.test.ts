import dotenv from 'dotenv';
import { create } from '..';
import { list } from '../../images';
import { getToken } from '../../test/get-token';
import { _delete } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();
        const generatedTime = new Date().toUTCString();
        const name = `${process.env.ENV}-${generatedTime}-name`;
        const caption = `${process.env.ENV}-${generatedTime}-caption`;
        const url = `${process.env.ENV}-${generatedTime}-url`;
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
                caption,
                imageId: ids[0],
                url,
                product,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );

        if (createRes.success) {
            const deleteRes = await _delete(
                { id: createRes.data.keyVisualId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            expect(deleteRes.success).toBe(true);
        }
    });
});
