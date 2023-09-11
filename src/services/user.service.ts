import authHeader from './auth-header';
import httpClient from 'common/http/httpClient';

export const getPublicContent = () => {
   return httpClient.get('/main/all');
};

export const getUserBoard = () => {
   return httpClient.get('/main/user', { headers: authHeader() });
};

export const getModeratorBoard = () => {
   return httpClient.get('/main/manager', { headers: authHeader() });
};

export const getAdminBoard = () => {
   return httpClient.get('/main/admin', { headers: authHeader() });
};
