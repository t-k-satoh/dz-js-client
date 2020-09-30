import axios from 'axios';

type OauthTokenResponse = {
    access_token: string;
    refresh_token: string;
    id_token: string;
    token_type: string;
    expires_in: number;
};

export const getToken = async (): Promise<string> => {
    const { data } = await axios.post<OauthTokenResponse>(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
            client_id: process.env.APP_CLIENT_ID,
            client_secret: process.env.APP_CLIENT_SECRET,
            audience: process.env.APP_AUDIENCE,
            grant_type: process.env.APP_GRANT_TYPE,
        },
        {
            headers: { 'content-type': 'application/json' },
        },
    );

    return data.access_token;
};
