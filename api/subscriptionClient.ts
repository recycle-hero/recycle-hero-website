import AWSAppSyncClient from 'aws-appsync';

import { APP_SYNC_REGION, APP_SYNC_URI, API_KEY } from './config';

export const client = new AWSAppSyncClient({
  url: APP_SYNC_URI,
  region: APP_SYNC_REGION,
  auth: {
    type: 'API_KEY',
    apiKey: API_KEY,
  },
  disableOffline: true
});
