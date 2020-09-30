import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseCategory, ResultCategory } from '../types';

export type Response = ResponseCategory;

export const replace = async (
    params: {
        id: string;
        name?: string;
        nickName?: string;
        product?: boolean;
    },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultCategory } | { success: false }> => {
    try {
        const { data } = await instance.put<Response>(
            `${PATH}/${params.id}`,
            {
                name: params.name,
                nick_name: params.nickName,
                product: params.product,
            },
            config,
        );

        return {
            success: true,
            data: {
                categoryId: data.category_id,
                name: data.name,
                nickName: data.nick_name,
                product: data.product,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            },
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};
