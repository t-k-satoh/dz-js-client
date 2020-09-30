import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImagesGroup, ResultImagesGroup } from '../types';

export type Response = ResponseImagesGroup;

export const retrieve = async (
    req: { id: string },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultImagesGroup } | { success: false }> => {
    try {
        const { data } = await instance.get<Response>(`${PATH}/${req.id}`, config);

        return {
            success: true,
            data: {
                imagesGroupId: data.images_group_id,
                name: data.name,
                description: data.description,
                imageId1: data.image_id_1,
                imageId2: data.image_id_2,
                imageId3: data.image_id_3,
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
