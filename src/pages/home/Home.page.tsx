import React, { useEffect } from 'react';
import noLeaveImg from 'assets/no-leaves-booked.png';
// import { getCurrentUser } from 'services/auth.service';

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
                  {/* <div className="mb-4 text-gray-600">Fancy some time off?</div>
                  <a
                     href={isLoggedIn ? 'myleave' : 'login'}
                     className="mb-2 book-btn bg-indigo-500 text-gray-100 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                  >
                     {isLoggedIn ? 'Book Leave' : 'Login to Book Leave'}
                  </a> */}
               </header>
            </div>
         </div>
      </>
   );
};

export default Home;
