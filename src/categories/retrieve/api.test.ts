import dotenv from 'dotenv';
import { create, _delete } from '..';
import { getToken } from '../../test/get-token';
import { retrieve } from '.';

dotenv.config();

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();
        const generatedTime = new Date().toUTCString();
        const name = `${process.env.ENV}-${generatedTime}-name`;
        const nickName = `${process.env.ENV}-${generatedTime}-nickName`;
        const product = false;

        const createRes = await create(
            {
                name,
                nickName,
                product,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );

        if (createRes.success) {
            const retrieveRes = await retrieve(
                { id: createRes.data.categoryId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (retrieveRes.success) {
                expect(retrieveRes.success).toBe(true);
                expect(retrieveRes.data.name).toBe(name);
                expect(retrieveRes.data.nickName).toBe(nickName);
                expect(retrieveRes.data.product).toBe(product);
            }

            await _delete(
                { id: createRes.data.categoryId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    });
});
