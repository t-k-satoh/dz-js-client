import { getToken } from '../../test/get-token';
import { list } from '.';

describe(`API ${__dirname}`, () => {
    test('Success', async () => {
        const token = await getToken();

        const { success } = await list({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        expect(success).toBe(true);
    });
});
