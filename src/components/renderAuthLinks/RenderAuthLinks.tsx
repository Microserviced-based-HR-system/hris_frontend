import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from 'components/dropdownMenu/DropdownMenu.jsx';
import MenuButton from 'components/dropdownMenu/MenuButton.jsx';
import { isAdmin } from 'common/helpers/Helpers.jsx';

const RenderAuthLinks = ({ currentUser, logOut }) => {
   return currentUser ? (
      <>
         <div className="flex items-center md:order-2">
            <DropdownMenu currentUser={currentUser} logOut={logOut} />
            <MenuButton targetMenu="mobile-menu-2" />
         </div>

         <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
         >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
               <li>
                  <a
                     href="/"
                     className=" block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                     aria-current="page"
                  >
                     Find a Job
                  </a>
               </li>

               {/* <li>
                  <a
                     href="/user"
                     className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                     User
                  </a>
               </li> */}
               <li>
                  <a
                     href="/myjobs"
                     className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                     My Jobs
                  </a>
               </li>
               {isAdmin(currentUser) && (
                  <>
                     {/* <li>
                     <a
                        href="/admin"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Admin
                     </a>
                  </li> */}

                     <li>
                        <a
                           href="/employees"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Employees
                        </a>
                     </li>
                     <li>
                        <a
                           href="/departments"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Departments
                        </a>
                     </li>
                     <li>
                        <a
                           href="/leaveReport"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Leave Approval
                        </a>
                     </li>
                     <li>
                        <a
                           href="/leaveBalanceReport"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Leave Balance
                        </a>
                     </li>
                     <li>
                        <a
                           href="/leaveRecommendation"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Leave Recommendation
                        </a>
                     </li>
                  </>
               )}
               {isAdmin(currentUser) && (
                  <>
                     <li>
                        <a
                           href="/employeeReport"
                           className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           Employee Report
                        </a>
                     </li>
                  </>
               )}
            </ul>
         </div>
      </>
   ) : (
      <>
         <div className="flex items-center ">
            <div className="items-center justify-between  w-full md:flex md:w-auto">
               <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
               >
                  Login
               </Link>
            </div>
         </div>
      </>
   );
};

export default RenderAuthLinks;
