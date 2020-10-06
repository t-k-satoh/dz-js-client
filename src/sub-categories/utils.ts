import { ResponseSubCategory, ResultSubCategory } from './types';

export const snakeToCamel = (subCategory: ResponseSubCategory): ResultSubCategory => ({
    subCategoryId: subCategory.sub_category_id,
    categoryId: subCategory.category_id,
    name: subCategory.name,
    nickName: subCategory.nick_name,
    createdAt: subCategory.created_at,
    updatedAt: subCategory.updated_at,
    product: subCategory.product,
});
