import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    withCredentials: true,
    timeout: 500000,
    headers: {
        authorization: `Bearer ${Cookies.get('token')}`,
    },
});
