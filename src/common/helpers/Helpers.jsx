/* eslint-disable  @typescript-eslint/no-explicit-any */
export const isAdmin = (user) => {
   return user && user.roles && user.roles.includes('ROLE_ADMIN');
};
