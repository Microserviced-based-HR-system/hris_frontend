import httpClient from 'common/http/httpClient';

const authApiEndPoint = import.meta.env.VITE_AUTH_API_END_POINT;
const auth_service_httpClient = new httpClient(authApiEndPoint);

export const getUserByEmail = async (email: string) => {
   return auth_service_httpClient.put('/user/' + email, { headers: authHeader() });
};
