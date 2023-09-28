// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { getCurrentUser } from 'services/auth.service';

const Profile: React.FC = () => {
   const currentUser = getCurrentUser();

   return (
      <div className="card">
         <header className="">
            <h3>
               <strong>{currentUser.user.username}</strong> Profile
            </h3>
         </header>
         <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{' '}
            {currentUser.token.substr(currentUser.token.length - 20)}
         </p>
         <p>
            <strong>Id:</strong> {currentUser.user.id}
         </p>
         <p>
            <strong>Email:</strong> {currentUser.user.email}
         </p>
         <strong>Authorities:</strong>
         <ul>
            {currentUser.user.roles &&
               currentUser.user.roles.map((role: string, index: number) => (
                  <li key={index}>{role}</li>
               ))}
         </ul>
      </div>
   );
};

export default Profile;
