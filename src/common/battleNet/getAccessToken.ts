import { isBefore } from 'date-fns';
import { clientID, clientSecret } from '@configs/env';
import { bnetAuthUrl, redisKeys } from '@constants/.';
import redisClient from '@common/redis';
import battleNet from './client';

const clientPayload = `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`;

interface Credentials {
  data: { expires_in: string; access_token: string };
}

const getAccessToken = async (): Promise<string> => {
  await redisClient.connect();

  const token = await redisClient.get(redisKeys.bnet.token);
  const expiry = await redisClient.get(redisKeys.bnet.expiry);

  const now = new Date();

  if (token && expiry && isBefore(now, new Date(expiry))) {
    return token;
  }

  const { data: credentials }: Credentials = await battleNet.post(bnetAuthUrl, clientPayload);
  now.setSeconds(+credentials.expires_in);

  redisClient.set(redisKeys.bnet.token, credentials.access_token);
  redisClient.set(redisKeys.bnet.expiry, now.toISOString());

  return credentials.access_token;
};

export default getAccessToken;
