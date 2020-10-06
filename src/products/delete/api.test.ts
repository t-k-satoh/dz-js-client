import dotenv from 'dotenv';
import { create } from '..';
import { categories, subCategories, imagesGroups } from '../..';
import { getToken } from '../../test/get-token';
import { _delete } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();

        const { categories: categoriesRes } = await categories.list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const categoryId = categoriesRes[0].categoryId;

        const { subCategories: subCategoriesRes } = await subCategories.list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const subCategoryId = subCategoriesRes[0].subCategoryId;

        const { imagesGroups: imagesGroupsRes } = await imagesGroups.list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const imagesGroupId = imagesGroupsRes[0].imagesGroupId;

        const suzuriId = 'SUZURI';

        const generatedTime = new Date().toUTCString();
        const name = `${process.env.ENV}-${generatedTime}-name`;
        const nickName = `${process.env.ENV}-${generatedTime}-nickName`;
        const description = `${process.env.ENV}-${generatedTime}-description`;
        const releaseDate = '2020-08-30 13:54:50.893765+09';

        const recommend = true;
        const _new = true;
        const product = false;

        const createRes = await create(
            {
                categoryId,
                subCategoryId,
                imagesGroupId,
                suzuriId,
                name,
                nickName,
                description,
                releaseDate,
                recommend,
                new: _new,
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
                { id: createRes.data.productId },
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
