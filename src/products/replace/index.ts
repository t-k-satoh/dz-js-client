import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseProduct, ResultProduct } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseProduct;

export const replace = async (
    params: Partial<Omit<ResultProduct, 'productId' | 'createdAt' | 'updatedAt'>> & { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultProduct } | { success: false }> => {
    const { subCategoryId, suzuriId, categoryId, imagesGroupId, releaseDate, nickName, id, ..._params } = params;

    try {
        const { data } = await instance.put<Response>(
            `${PATH}/${id}`,
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
        return {
            success: false,
        };
    }
};
