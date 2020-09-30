import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseCategory, ResultCategory } from '../types';

export type Response = ResponseCategory;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultCategory } | { success: false }> => {
    try {
        const res = await instance.get<Response>(`${PATH}/${req.id}`, config);

        return {
            success: true,
            data: {
                categoryId: res.data.category_id,
                name: res.data.name,
                nickName: res.data.nick_name,
                product: res.data.product,
                createdAt: res.data.created_at,
                updatedAt: res.data.updated_at,
            },
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};
