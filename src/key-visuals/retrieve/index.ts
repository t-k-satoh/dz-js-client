import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseKeyVisual, ResultKeyVisual } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseKeyVisual;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultKeyVisual } | { success: false }> => {
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
