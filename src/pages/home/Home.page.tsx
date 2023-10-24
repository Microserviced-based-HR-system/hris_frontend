import React, { useEffect, useState } from 'react';
import noLeaveImg from 'assets/no-leaves-booked.png';
import { getJobList } from 'services/job.service';
import IJob from 'types/job.type';

const authApiEndPoint = import.meta.env.VITE_AUTH_API_END_POINT;
const jobApiEndPoint = import.meta.env.VITE_JOB_API_END_POINT;
const Home: React.FC = () => {
   // const isLoggedIn = getCurrentUser() !== null;

   useEffect(() => {
      // const currentUser = getCurrentUser();
   });

   const [jobs, setJobs] = useState<IJob[]>([]);

   useEffect(() => {
      const fetchJobs = async () => {
         getJobList().then((response) => {
            const jobs = response as { data: IJob };
            console.log(jobs);
            if (Array.isArray(jobs.data)) {
               setJobs(jobs.data);
            }
         });
      };
      fetchJobs();
   }, []);

   const renderJobs = () => {
      return (
         <ul className="mt-4 mb-4 flex gap-1 overflow-auto md:flex-wrap md:overflow-hidden">
            {jobs.map((job) => (
               <li key={job.id} className="shrink-0 md:shrink">
                  <a href={'/jobs/' + job.id}>
                     <span className="inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 border-indigo-900 text-white bg-indigo-900">
                        <span aria-hidden="true" role="img" className="text-sm">
                           {job.title}
                        </span>
                     </span>
                  </a>
               </li>
            ))}
         </ul>
      );
   };

   return (
      <>
         <div className="card">
            <div className="mt-2 mb-4 flex items-center justify-between">
               <span className="text-[18px]">Find your dream job </span>
            </div>
            <div className="border-t border-gray-350 py-4">
               {renderJobs() ? (
                  renderJobs()
               ) : (
                  <header className="flex flex-col items-center">
                     <div className="mb-1 text-gray-800 text-lg">There is nothing to show :(</div>
                     <div className="mt-8">
                        <img src={noLeaveImg} className="w-auto h-24" />
                     </div>
                  </header>
               )}

               <h1>Vite is running in {import.meta.env.MODE}</h1>
               <p>Using AuthService api from {authApiEndPoint}</p>
               <p>Using JobService api from {jobApiEndPoint}</p>
               {/* <span id="auth-service-endpoint" hidden="hidden"></span>
               <span id="auth-service-endpoint" hidden="hidden"></span> */}
            </div>
         </div>
      </>
   );
};

export default Home;
