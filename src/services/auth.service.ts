// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import httpClient from 'common/http/httpClient';

const authApiEndPoint = import.meta.env.VITE_AUTH_API_END_POINT;
const auth_service_httpClient = new httpClient(authApiEndPoint);

interface LoginResponse {
   token: string;
   type: string;
   id: string;
   username: string;
   email: string;
   roles: string[];
}

export const register = (username: string, email: string, password: string) => {
   return auth_service_httpClient.post('/signup', {
      data: {
         user: {
            username: username,
            email: email,
            password: password,
         },
      },
   });
};

export const login = (email: string, password: string) => {
   return auth_service_httpClient
      .post('/login', {
         data: {
            user: {
               email: email,
               password: password,
            },
         },
      })
      .then((response) => {
         console.log(response.data);
         console.log(response.headers.authorization);
         localStorage.setItem('user', JSON.stringify(response.data.data));
         localStorage.setItem('auth_token', JSON.stringify(response.headers.authorization));
         return response.data as LoginResponse;
      });
};

export const logout = () => {
   localStorage.removeItem('user');
};

export const getCurrentUser = () => {
   const userStr = localStorage.getItem('user');
   const auth_token = localStorage.getItem('auth_token');
   const currentUser = JSON.parse(userStr);

   console.log(currentUser);

   if (currentUser && auth_token) {
      return {
         user: currentUser.user,
         token: auth_token,
      };
   }

   return null;
};
