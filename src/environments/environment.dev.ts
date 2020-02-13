/**
 * This is the base URI
 */
const baseUri = `http://localhost`;

/**
 * Set the port const
 */
const port = '9000';

/**
 * These are the constants for the production config
 */
export const environment = {
  production: false,
  environmentName: 'Default Dev Environment',
  rootUri: `${baseUri}:${port}/`,
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`
};
