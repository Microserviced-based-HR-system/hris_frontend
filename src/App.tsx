import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import * as AuthService from './services/auth.service';
import IUser from './types/user.type';
import Login from 'pages/login/Login.page';
import Register from 'pages/register/Register.page';
import Home from 'pages/home/Home.page';
import Profile from 'pages/profile/Profile.page';
import EventBus from 'common/EventBus';
import RenderAuthLinks from 'components/renderAuthLinks/RenderAuthLinks';
import Job from 'pages/job/Job.page';
import JobApplication from 'pages/job/JobApplication';
import AllEmployees from 'pages/employee/AllEmployees.page';
import DetailEmployee from 'pages/employee/DetailEmployee.page';
import EditEmployee from 'pages/employee/EditEmployee.page';
import NewEmployeeForm from 'pages/employee/NewEmployeeForm.page';
import DeptEmployees from 'pages/employee/DeptEmployees.page';

import Candidate from 'pages/candidate/candidateprofile';

const App: React.FC = () => {
   const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

   useEffect(() => {
      const getuser = AuthService.getCurrentUser();
      if (getuser) {
         setCurrentUser(getuser);
      }

      EventBus.on('logout', logOut);

      return () => {
         EventBus.remove('logout', logOut);
      };
   }, []);

   const logOut = () => {
      AuthService.logout();
      setCurrentUser(undefined);
   };

   const JobById = () => {
      const { id } = useParams<{ id: string }>();

      return <Job id={id} />;
   };

   return (
      <div className="flex flex-col">
         <nav className="bg-white border-gray-200 light:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
               <a href="/" className="flex items-center">
                  <span className="self-center text-1xl font-semibold whitespace-nowrap dark:text-white">
                     TOM
                  </span>
               </a>

               <RenderAuthLinks currentUser={currentUser} logOut={logOut} />
            </div>
         </nav>

         <div className="boxed-container w-full px-2">
            <div className="flex-wrap lg:flex">
               <div className="w-full">
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/home" element={<Home />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/register" element={<Register />} />
                     <Route path="/profile" element={<Profile />} />
                     <Route path="/candidate" element={<Candidate />} />
                     <Route path="/jobs/:id" element={<JobById />} />
                     <Route path="/jobs/:id/application" element={<JobApplication />} />
                     <Route path="/employees" element={<AllEmployees />} />
                     <Route path="/detail_employee" element={<DetailEmployee />} />
                     <Route path="/new_employee" element={<NewEmployeeForm />} />
                     <Route path="/edit_employee" element={<EditEmployee />} />
                     <Route path="/department/employees" element={<DeptEmployees />} />
                  </Routes>
               </div>
            </div>
         </div>
      </div>
   );
};

export default App;
