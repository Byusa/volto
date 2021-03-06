/**
 * Sitemap helper.
 * @module helpers/Sitemap
 */

import superagent from 'superagent';
import cookie from 'react-cookie';

import { settings } from '~/config';

/**
 * Get a resource image/file with authenticated (if token exist) API headers
 * @function getAPIResourceWithAuth
 * @param {Object} req Request object
 * @return {string} The response with the image
 */
export const getAPIResourceWithAuth = (req) =>
  new Promise((resolve) => {
    let apiPath = '';
    if (settings.internalApiPath && __SERVER__) {
      apiPath = settings.internalApiPath;
    } else {
      apiPath = settings.apiPath;
    }
    const request = superagent
      .get(`${apiPath}${req.path}`)
      .responseType('blob');
    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }
    request.end((error, res = {}) => {
      if (error) {
        resolve(res || error);
      } else {
        resolve(res);
      }
    });
  });
