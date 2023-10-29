// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from 'react';
import { getCurrentUser } from 'services/auth.service';

const Profile: React.FC = () => {
   const currentUser = getCurrentUser();
   useEffect(() => {
      // console.log(currentUser)
   });
   return (
      // <></>
      <div className="card">
         <header className="">
            <h3>
               <strong>{currentUser.username}</strong> Profile
            </h3>
         </header>
         <p>
            <strong>Token:</strong> {currentUser.auth_token.substring(0, 20)} ...{' '}
            {currentUser.auth_token.substr(currentUser.auth_token.length - 20)}
         </p>
         <p>
            <strong>Id:</strong> {currentUser.id}
         </p>
         <p>
            <strong>Email:</strong> {currentUser.email}
         </p>
         <strong>Authorities:</strong>
         <ul>
            {currentUser.roles &&
               currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
         </ul>
      </div>
   );
};

export default Profile;
