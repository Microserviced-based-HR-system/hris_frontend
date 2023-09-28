import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import * as AuthService from './services/auth.service';
import IUser from './types/user.type';
import Login from 'pages/login/Login.page';
import Register from 'pages/register/Register.page';
import Home from 'pages/home/Home.page';
import Profile from 'pages/profile/Profile.page';
import BoardUser from 'pages/board-user/BoardUser.page';
import BoardAdmin from 'pages/board-admin/BoardAdmin.page';
import EventBus from 'common/EventBus';
import RenderAuthLinks from 'components/renderAuthLinks/RenderAuthLinks';

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
                     <Route path="/user" element={<BoardUser />} />
                     <Route path="/admin" element={<BoardAdmin />} />
                  </Routes>
               </div>
            </div>
         </div>
      </div>
   );
};

export default App;
