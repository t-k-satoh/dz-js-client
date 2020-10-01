import dotenv from 'dotenv';
import { create, _delete } from '..';
import { getToken } from '../../test/get-token';
import { replace } from '.';

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
