import { ResponseProduct, ResultProduct } from './types';

export const snakeToCamel = (product: ResponseProduct): ResultProduct => ({
    productId: product.product_id,
    categoryId: product.category_id,
    subCategoryId: product.sub_category_id,
    suzuriId: product.suzuri_id,
    name: product.name,
    nickName: product.nick_name,
    description: product.description,
    releaseDate: product.release_date,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
    product: product.product,
    imagesGroupId: product.images_group_id,
    recommend: product.recommend,
    new: product.new,
});
