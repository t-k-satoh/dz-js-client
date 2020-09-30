import { AxiosRequestConfig } from 'axios';
import { Page } from '../../types';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { ResponseKeyVisual, ResultKeyVisual } from '../types';
import { snakeToCamel } from '../utils';

export type Response = {
    key_visuals: ResponseKeyVisual[];
} & Page;

export const list = async (
    config?: AxiosRequestConfig,
): Promise<{ success: boolean; keyVisuals: ResultKeyVisual[] }> => {
    try {
        const { data } = await instance.get<Response>(PATH, config);

        return {
            success: true,
            keyVisuals: data.key_visuals.map(key_visual => snakeToCamel(key_visual)),
        };
    } catch (error) {
        return {
            success: false,
            keyVisuals: [],
        };
    }
};
