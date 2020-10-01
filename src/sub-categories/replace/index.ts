import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseSubCategory, ResultSubCategory } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseSubCategory;

export const replace = async (
    params: {
        id: string;
        categoryId?: string;
        name?: string;
        nickName?: string;
        product?: boolean;
    },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultSubCategory } | { success: false }> => {
    try {
        const { data } = await instance.put<Response>(
            `${PATH}/${params.id}`,
            {
                category_id: params.categoryId,
                nick_name: params.nickName,
                name: params.name,
                product: params.product,
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
