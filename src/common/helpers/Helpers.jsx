export const isAdmin = (user) => {
   return user && user.roles && user.roles.includes('ROLE_ADMIN');
};
