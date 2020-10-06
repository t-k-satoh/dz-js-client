import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseProduct, ResultProduct } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseProduct;

export const create = async (
    params: Omit<ResultProduct, 'productId' | 'createdAt' | 'updatedAt'>,
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultProduct } | { success: false }> => {
    const { subCategoryId, suzuriId, categoryId, imagesGroupId, releaseDate, nickName, ..._params } = params;

    try {
        const { data } = await instance.post<Response>(
            PATH,
            {
                category_id: categoryId,
                sub_category_id: subCategoryId,
                suzuri_id: suzuriId,
                images_group_id: imagesGroupId,
                release_date: releaseDate,
                nick_name: nickName,
                ..._params,
            },
            config,
        );

        return {
            success: true,
            data: snakeToCamel(data),
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
