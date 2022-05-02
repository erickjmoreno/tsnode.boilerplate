import 'module-alias/register';
import getAccessToken from '@common/battleNet/getAccessToken';
const init = async () => {
    const accessToken = getAccessToken();
    console.log(accessToken);
};
init();
