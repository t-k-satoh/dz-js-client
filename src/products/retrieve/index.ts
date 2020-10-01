import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseProduct, ResultProduct } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseProduct;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultProduct } | { success: false }> => {
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
