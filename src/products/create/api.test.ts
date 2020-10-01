import dotenv from 'dotenv';
import { _delete } from '..';
import { categories, subCategories, imagesGroups } from '../..';
import { getToken } from '../../test/get-token';
import { create } from '.';

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
        const releaseDate = new Date().toISOString();

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

        expect(createRes.success).toBe(true);

        if (createRes.success) {
            await _delete(
                { id: createRes.data.productId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    });
});
