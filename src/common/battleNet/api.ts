import { bnetApiBaseUrl } from '@constants/.';
import axios from 'axios';
import getAccessToken from './getAccessToken';

const api = axios.create({});

api.interceptors.request.use(async (config) => {
  const character = config?.params?.name;
  const realm = config?.params?.realm;

  if (!character || !realm) throw new Error('missing Character name or realm');

  const accessToken = await getAccessToken();
  config.url = `${bnetApiBaseUrl}/${character.toLowerCase()}/${realm.toLowerCase()}/${config.url}`;
  config.url += `?namespace=profile-us&locale=en_US&access_token=${accessToken}`;

  return config;
});

export default api;
