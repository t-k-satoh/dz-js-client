import dotenv from 'dotenv';
import { _delete, retrieve, replace } from '..';
import { getToken } from '../../test/get-token';
import { create } from '.';

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

        expect(createRes.success).toBe(true);

        if (createRes.success) {
            const retrieveRes = await retrieve(
                { id: createRes.data.categoryId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            expect(retrieveRes.success).toBe(true);
            if (retrieveRes.success) {
                expect(retrieveRes.data.name).toBe(name);
                expect(retrieveRes.data.nickName).toBe(nickName);
                expect(retrieveRes.data.product).toBe(product);
            }

            const replaceTime = new Date().toUTCString();
            const replaceName = `${process.env.ENV}-${replaceTime}-name-replace`;
            const replaceNickName = `${process.env.ENV}-${replaceTime}-nickName-replace`;

            const replaceRes = await replace(
                { id: createRes.data.categoryId, name: replaceName, nickName: replaceNickName },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            expect(replaceRes.success).toBe(true);
            if (replaceRes.success) {
                expect(replaceRes.data.name).toBe(replaceName);
                expect(replaceRes.data.nickName).toBe(replaceNickName);
                expect(replaceRes.data.product).toBe(product);
            }

            const deleteRes = await _delete(
                { id: createRes.data.categoryId },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            expect(deleteRes.success).toBe(true);
        }
    });
});
