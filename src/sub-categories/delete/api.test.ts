import dotenv from 'dotenv';
import { create } from '..';
import { list } from '../../categories';
import { getToken } from '../../test/get-token';
import { _delete } from '.';

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

        if (createRes.success) {
            const deleteRes = await _delete(
                { id: createRes.data.subCategoryId },
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
