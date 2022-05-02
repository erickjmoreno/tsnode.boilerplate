import axios from 'axios';
import { bnetAuthUrl } from '@constants/.';
const instance = axios.create({
    baseURL: bnetAuthUrl,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export default instance;
