import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseImagesGroup, ResultImagesGroup } from '../types';

export type Response = {
    images_groups: ResponseImagesGroup[];
} & Page;

export const list = async (
    config?: AxiosRequestConfig,
): Promise<{ success: boolean; imagesGroups: ResultImagesGroup[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            imagesGroups: data.images_groups.map(images_group => ({
                imagesGroupId: images_group.images_group_id,
                name: images_group.name,
                description: images_group.description,
                imageId1: images_group.image_id_1,
                imageId2: images_group.image_id_2,
                imageId3: images_group.image_id_3,
                createdAt: images_group.created_at,
                updatedAt: images_group.updated_at,
                product: images_group.product,
            })),
        };
    } catch (error) {
        return {
            success: false,
            imagesGroups: [],
        };
    }
};
