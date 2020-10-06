import dotenv from 'dotenv';
import { _delete } from '..';
import { list } from '../../categories';
import { getToken } from '../../test/get-token';
import { create } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();
        const generatedTime = new Date().toUTCString();
        const name = `${process.env.ENV}-${generatedTime}-name`;
        const nickName = `${process.env.ENV}-${generatedTime}-nickName`;
        const product = false;

        const { categories } = await list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const ids = categories.map(category => category.categoryId);

        const createRes = await create(
            {
                categoryId: ids[0],
                name,
                nickName,
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
                { id: createRes.data.subCategoryId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    });
});
