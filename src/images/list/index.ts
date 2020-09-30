import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImage, ResultImage } from '../types';

export type Response = {
    images: ResponseImage[];
} & Page;

export const list = async (config?: AxiosRequestConfig): Promise<{ success: boolean; images: ResultImage[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            images: data.images.map(image => ({
                imageId: image.image_id,
                url: image.url,
                name: image.name,
                createdAt: image.created_at,
                updatedAt: image.updated_at,
                product: image.product,
            })),
        };
    } catch (error) {
        return {
            success: false,
            images: [],
        };
    }
};
