import dotenv from 'dotenv';
import { create, _delete } from '..';
import { getToken } from '../../test/get-token';
import { retrieve } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();

        const { success } = await retrieve(
            {
                id: 'd04281d7-3941-40e7-8e96-9e12244c7070',
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );

        expect(success).toBe(true);
    });
});
