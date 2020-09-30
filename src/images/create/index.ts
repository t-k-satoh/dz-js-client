import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImage, ResultImage } from '../types';

export type Response = ResponseImage;

export const create = async (
    params: {
        file: File;
        product: boolean;
    },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultImage } | { success: false }> => {
    try {
        const { data } = await instance.post<Response>(PATH, params, config);

        return {
            success: true,
            data: {
                imageId: data.image_id,
                url: data.url,
                name: data.name,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
                product: data.product,
            },
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};
