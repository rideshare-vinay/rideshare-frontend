/**
 * This is the base URI
 */
const baseUri = `http://AWS-IP-ADDRESS`;

/**
 * These are the dev environment variables
 */

const port = '9000';

/**
* These are the constants for the production config
*/

export const environment = {
  production: true,
  environmentName: 'Production Environment',
  rootUri: `${baseUri}/`,
  userUri: `${baseUri}/users/`,
  batchesUri: `${baseUri}/batches`,
  carUri: `${baseUri}/cars/`,
  adminUri: `${baseUri}/admins/`,
  recommendationUri: `${baseUri}:${port}/recommendations/`,
  googleMapsApiKey: ``
};
