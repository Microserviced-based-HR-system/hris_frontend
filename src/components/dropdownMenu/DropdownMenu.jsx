import React from 'react';
import profileImg from '../../assets/profile-picture.jpeg';
const DropdownMenu = ({ currentUser, logOut }) => {
   return (
      <>
         <button
            id="user-menu-button"
            data-dropdown-toggle="user-dropdown"
            className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button"
         >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 mr-2 rounded-full" src={profileImg} alt="user photo" />
            {currentUser.user.username
               .split(' ')
               .map((n) => n[0])
               .join('')
               .toUpperCase()}
            <svg
               className="w-4 h-4 mx-1.5"
               aria-hidden="true"
               fill="currentColor"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
               />
            </svg>
         </button>

         <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
         >
            <div className="px-4 py-3">
               <span className="block text-sm text-gray-900 dark:text-white">
                  {currentUser.username}
               </span>
               <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {currentUser.email}
               </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
               <li>
                  <a
                     href="/home"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                     Dashboard
                  </a>
               </li>
               <li>
                  <a
                     href="/profile"
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                     Settings
                  </a>
               </li>
               <li>
                  <a
                     href="/home"
                     onClick={logOut}
                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                     Sign out
                  </a>
               </li>
            </ul>
         </div>
      </>
   );
};

export default DropdownMenu;
