import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImage, ResultImage } from '../types';

export type Response = ResponseImage;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultImage } | { success: false }> => {
    try {
        const { data } = await instance.get<Response>(`${PATH}/${req.id}`, config);

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
