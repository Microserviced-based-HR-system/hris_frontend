// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { getJobById } from 'services/job.service';
// import { createApplication } from 'services/job.service';
import IJob from 'types/job.type';

const Job: React.FC<{ id }> = ({ id }) => {
   const [job, setJob] = useState<IJob>({});

   useEffect(() => {
      const fetchJob = async () => {
         getJobById(id).then((response) => {
            const job = response as { data: IJob };
            setJob(job.data.data);
         });
      };
      fetchJob();
   }, [id]);

   //  const handleCreateApplication = (event) => {
   //     event.preventDefault();
   //     alert('application is submitted');

   //     // createApplication(job.id).then(
   //     //    (response) => {
   //     //       if ((response as { message: string }).message == 'SUCCESS') {
   //     //          if (confirm(`Apply Job success`)) {
   //     //             window.location.reload();
   //     //          }
   //     //       }
   //     //    },
   //     //    (error) => {
   //     //       const resMessage =
   //     //          (error.response && error.response.data && error.response.data.message) ||
   //     //          error.message ||
   //     //          error.toString();
   //     //       console.log(resMessage);
   //     //    },
   //     // );
   //  };

   const handleClosedApplication = (event) => {
      event.preventDefault();
      alert('application has closed');
   };

   return (
      <div className="card w-3/4">
         <div className="mt-2 mb-4 flex items-center justify-between">
            <span className="text-[18px]">Job #{job.id}</span>
         </div>
         <a
            href="#"
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
         >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
               <div>
                  <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{job.title}</h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                     Company #{job.company_id}
                  </p>
               </div>

               <div className="hidden sm:block sm:shrink-0">
                  {job.status == 'close' ? (
                     <button
                        onClick={handleClosedApplication}
                        type="submit"
                        className="bg-gray-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-600"
                        style={{ border: '2px solid', width: '100px', float: 'right' }}
                     >
                        Apply
                     </button>
                  ) : (
                     <a href={`/jobs/${job.id}/application`}>
                        <button
                           type="submit"
                           className="bg-indigo-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                           style={{ border: '2px solid', width: '100px', float: 'right' }}
                        >
                           Apply
                        </button>
                     </a>
                  )}
               </div>
            </div>

            <div className="mt-4">
               <p className="max-w-[40ch] text-sm text-gray-500">{job.description}</p>
            </div>

            <div className="mt-5 mb-4 flow-root">
               <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                     <dt className="font-medium text-gray-900">Location</dt>
                     <dd className="text-gray-700 sm:col-span-2">{job.location}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                     <dt className="font-medium text-gray-900">Job Type</dt>
                     <dd className="text-gray-700 sm:col-span-2">{job.job_type}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                     <dt className="font-medium text-gray-900">Application closing date</dt>
                     <dd className="text-gray-700 sm:col-span-2">{job.expired_date}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                     <dt className="font-medium text-gray-900">Status</dt>
                     <dd className="text-gray-700 sm:col-span-2 capitalize">{job.status}</dd>
                  </div>
               </dl>
            </div>
         </a>
      </div>
   );
};

export default Job;
