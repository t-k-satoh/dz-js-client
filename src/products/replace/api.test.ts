import dotenv from 'dotenv';
import { create, _delete } from '..';
import { categories, subCategories, imagesGroups } from '../..';
import { getToken } from '../../test/get-token';
import { replace } from '.';

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
            const replaceCategoryId = categoriesRes[1].categoryId;
            const replaceSubCategoryId = subCategoriesRes[1].subCategoryId;
            const replaceImagesGroupId = imagesGroupsRes[1].imagesGroupId;

            const replaceSuzuriId = 'SUZURI-replace';

            const replaceTime = new Date().toUTCString();
            const replaceName = `${process.env.ENV}-${replaceTime}-name`;
            const replaceNickName = `${process.env.ENV}-${replaceTime}-nickName`;
            const replaceDescription = `${process.env.ENV}-${replaceTime}-description`;
            const replaceReleaseDate = '2020-08-30 14:54:50.893765+09';

            const replaceRecommend = false;
            const replaceNew = false;

            const replaceRes = await replace(
                {
                    id: createRes.data.productId,
                    categoryId: replaceCategoryId,
                    subCategoryId: replaceSubCategoryId,
                    imagesGroupId: replaceImagesGroupId,
                    suzuriId: replaceSuzuriId,
                    name: replaceName,
                    nickName: replaceNickName,
                    description: replaceDescription,
                    releaseDate: replaceReleaseDate,
                    recommend: replaceRecommend,
                    new: replaceNew,
                    product,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (replaceRes.success) {
                expect(replaceRes.success).toBe(true);
                expect(replaceRes.data).toEqual({
                    productId: createRes.data.productId,
                    categoryId: replaceCategoryId,
                    subCategoryId: replaceSubCategoryId,
                    imagesGroupId: replaceImagesGroupId,
                    suzuriId: replaceSuzuriId,
                    name: replaceName,
                    nickName: replaceNickName,
                    description: replaceDescription,
                    releaseDate: '2020-08-30T05:54:50.893Z',
                    recommend: replaceRecommend,
                    new: replaceNew,
                    product,
                    createdAt: replaceRes.data.createdAt,
                    updatedAt: replaceRes.data.updatedAt,
                });
            }

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
