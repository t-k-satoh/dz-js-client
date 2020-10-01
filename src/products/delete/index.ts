import { AxiosRequestConfig } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';

export const _delete = async (req: { id: string }, config?: AxiosRequestConfig): Promise<{ success: boolean }> => {
    try {
        await instance.delete<null>(`${PATH}/${req.id}`, config);

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};
