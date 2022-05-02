import { isBefore } from 'date-fns';
import { clientID, clientSecret } from '@configs/env';
import { bnetAuthUrl, redisKeys } from '@constants/.';
import redisClient from '@common/redis';
import battleNetClient from './client';
const clientPayload = {
    grant_type: 'client_credentials',
    client_id: clientID,
    client_secret: clientSecret,
};
const getAccessToken = async () => {
    await redisClient.connect();
    const token = await redisClient.get(redisKeys.bnet.token);
    const expiry = await redisClient.get(redisKeys.bnet.expiry);
    const now = new Date();
    if (token && expiry && isBefore(now, new Date(expiry))) {
        return token;
    }
    const credentials = await battleNetClient.post(bnetAuthUrl, clientPayload);
    const expiration = new Date().setSeconds(+credentials.expires_in);
    redisClient.set(redisKeys.bnet.token, credentials.token);
    redisClient.set(redisKeys.bnet.expiry, expiration);
    return credentials.token;
};
export default getAccessToken;
