import dotenv from 'dotenv';
import { _delete } from '..';
import { list } from '../../images';
import { getToken } from '../../test/get-token';
import { create } from '.';

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

        expect(createRes.success).toBe(true);

        if (createRes.success) {
            await _delete(
                { id: createRes.data.keyVisualId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    });
});
