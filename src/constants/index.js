
const isProduction = process.env.NODE_ENV === 'production';
//const isProduction = true;

const isDevProduction = window.location.href.indexOf('dev.') != -1 || window.location.href.indexOf(':4000') != -1;

//const isDevProduction = false;
const API_VERSION = 1;

export const SITE_URL = isProduction ? (isDevProduction ? 'https://setcoins-dev.herokuapp.com' : 'https://www.setcoins.com') : 'http://localhost:8080';

export const API_BASE_URL = isProduction ? (isDevProduction ? 'https://setcoins-dev.herokuapp.com' : 'https://www.setcoins.com') : 'http://localhost:3000';

export const API_ROOT = `${API_BASE_URL}/api/v/${API_VERSION}`;
export const API_ROOT_GRAPH = `${API_ROOT}/graph`;
export const S3_ROOT = 'https://s3.us-east-2.amazonaws.com/setcoins.com/';
export const S3_IMAGES = S3_ROOT + 'images/';

export const GITHUB_ROOT = 'https://github.com/';

