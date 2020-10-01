import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseSubCategory, ResultSubCategory } from '../types';
import { snakeToCamel } from '../utils';

export type Response = {
    sub_categories: ResponseSubCategory[];
} & Page;

export const list = async (
    config?: AxiosRequestConfig,
): Promise<{ success: boolean; subCategories: ResultSubCategory[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            subCategories: data.sub_categories.map(sub_category => snakeToCamel(sub_category)),
        };
    } catch (error) {
        return {
            success: false,
            subCategories: [],
        };
    }
};
