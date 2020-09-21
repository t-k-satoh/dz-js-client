import { AxiosResponse } from 'axios';
import { instance } from '../../utils';
import { PATH } from '../constants';
import { Req, Res } from './types';

export const create = (req: Req): Promise<AxiosResponse<Res>> => instance.post(PATH, req);
