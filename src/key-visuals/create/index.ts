import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseKeyVisual, ResultKeyVisual } from '../types';
import { snakeToCamel } from '../utils';

export type Response = ResponseKeyVisual;

export const create = async (
    params: {
        url: string;
        name: string;
        product: boolean;
        caption: string;
        imageId: string;
    },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultKeyVisual } | { success: false }> => {
    try {
        const { data } = await instance.post<Response>(
            PATH,
            {
                image_id: params.imageId,
                ...params,
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
