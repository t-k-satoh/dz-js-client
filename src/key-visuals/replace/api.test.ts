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
            const replaceTime = new Date().toUTCString();
            const replaceName = `${process.env.ENV}-${replaceTime}-name`;
            const replaceCaption = `${process.env.ENV}-${replaceTime}-caption`;
            const replaceUrl = `${process.env.ENV}-${replaceTime}-url`;

            const replaceRes = await replace(
                { id: createRes.data.keyVisualId, name: replaceName, caption: replaceCaption, url: replaceUrl },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (replaceRes.success) {
                expect(replaceRes.success).toBe(true);
                expect(replaceRes.data.name).toBe(replaceName);
                expect(replaceRes.data.caption).toBe(replaceCaption);
                expect(replaceRes.data.url).toBe(replaceUrl);
                expect(replaceRes.data.product).toBe(product);
            }

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
