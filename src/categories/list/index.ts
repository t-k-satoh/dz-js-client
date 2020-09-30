import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseCategory, ResultCategory } from '../types';

export type Response = {
    categories: ResponseCategory[];
} & Page;

export const list = async (
    config?: AxiosRequestConfig,
): Promise<{ success: boolean; categories: ResultCategory[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            categories: data.categories.map(category => ({
                categoryId: category.category_id,
                name: category.name,
                nickName: category.nick_name,
                product: category.product,
                createdAt: category.created_at,
                updatedAt: category.updated_at,
            })),
        };
    } catch (error) {
        return {
            success: false,
            categories: [],
        };
    }
};
