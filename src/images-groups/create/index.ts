import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImagesGroup, ResultImagesGroup } from '../types';

export type Response = ResponseImagesGroup;

export const create = async (
    params: {
        name: string;
        description: string;
        imageId1: string;
        imageId2?: string;
        imageId3?: string;
        product: boolean;
    },
    config?: AxiosRequestConfig,
): Promise<{ success: true; data: ResultImagesGroup } | { success: false }> => {
    try {
        const { name, description, product, ...images } = params;

        const { data } = await instance.post<Response>(
            PATH,
            {
                name,
                description,
                product,
                image_id_1: images.imageId1,
                image_id_2: images.imageId2,
                image_id_3: images.imageId3,
            },
            config,
        );

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
