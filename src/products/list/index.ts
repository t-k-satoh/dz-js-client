import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseProduct, ResultProduct } from '../types';
import { snakeToCamel } from '../utils';

export type Response = {
    products: ResponseProduct[];
} & Page;

export const list = async (config?: AxiosRequestConfig): Promise<{ success: boolean; products: ResultProduct[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            products: data.products.map(key_visual => snakeToCamel(key_visual)),
        };
    } catch (error) {
        return {
            success: false,
            products: [],
        };
    }
};
