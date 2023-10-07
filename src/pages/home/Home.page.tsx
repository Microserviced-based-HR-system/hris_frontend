import React, { useEffect } from 'react';
import noLeaveImg from 'assets/no-leaves-booked.png';
// import { getCurrentUser } from 'services/auth.service';
const authApiEndPoint = import.meta.env.VITE_AUTH_API_END_POINT;
// const authApiEndPoint = import.meta.env.VITE_AUTH_API_END_POINT;
const Home: React.FC = () => {
   // const isLoggedIn = getCurrentUser() !== null;

   useEffect(() => {
      // const currentUser = getCurrentUser();
   });

   return (
      <>
         <div className="card">
            <div className="mt-2 mb-4 flex items-center justify-between">
               <span className="text-[18px]">Find your dream job </span>
            </div>
            <div className="border-t border-gray-350 py-4">
               <header className="flex flex-col items-center">
                  <div className="mb-1 text-gray-800 text-lg">There is nothing to show :(</div>
                  <div className="mt-8">
                     <img src={noLeaveImg} className="w-auto h-24" />
                  </div>
               </header>
               <h1>Vite is running in {import.meta.env.MODE}</h1>
               <p>Using AuthService api from {authApiEndPoint}</p>
               {/* <span id="auth-service-endpoint" hidden="hidden"></span>
               <span id="auth-service-endpoint" hidden="hidden"></span> */}
            </div>
         </div>
      </>
   );
};

export default Home;
