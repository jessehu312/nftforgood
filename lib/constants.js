export const ROOT_URL = '/';
export const COLLECTIBLE_URL = '/collectible/';
const dev = process.env.NODE_ENV !== 'production';

export const PROFILE_URL = '/profile/';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://your_deployment.server.com';
