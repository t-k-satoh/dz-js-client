import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseSubCategory, ResultSubCategory } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseSubCategory;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultSubCategory } | { success: false }> => {
    try {
        const { data } = await instance.get<Response>(`${PATH}/${req.id}`, config);

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
