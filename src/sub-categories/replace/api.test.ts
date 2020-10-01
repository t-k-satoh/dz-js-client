import dotenv from 'dotenv';
import { create, _delete } from '..';
import { list } from '../../categories';
import { getToken } from '../../test/get-token';
import { replace } from '.';

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
            const replaceTime = new Date().toUTCString();
            const replaceCategoryId = ids[1];
            const replaceName = `${process.env.ENV}-${replaceTime}-name`;
            const replaceNickName = `${process.env.ENV}-${replaceTime}-nickName`;

            const replaceRes = await replace(
                {
                    id: createRes.data.subCategoryId,
                    name: replaceName,
                    nickName: replaceNickName,
                    categoryId: replaceCategoryId,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            expect(replaceRes.success).toBe(true);

            if (replaceRes.success) {
                expect(replaceRes.data.name).toBe(replaceName);
                expect(replaceRes.data.nickName).toBe(replaceNickName);
                expect(replaceRes.data.categoryId).toBe(replaceCategoryId);
                expect(replaceRes.data.product).toBe(product);
            }

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
