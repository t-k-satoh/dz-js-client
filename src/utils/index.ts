import axios from 'axios';
import dotenv from 'dotenv';
import Cookies from 'js-cookie';

dotenv.config();

export const instance = axios.create({
    baseURL: 'https://dz-api-express.herokuapp.com/api/v1/',
    withCredentials: true,
    timeout: 500000,
    headers: {
        authorization: `Bearer ${Cookies.get(process.env.COOKIE_KEY || '')}`,
    },
});
