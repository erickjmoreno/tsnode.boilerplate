import axios from 'axios';
import { bnetBaseUrl } from '@constants/.';

const battleNet = axios.create({
  baseURL: bnetBaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default battleNet;
