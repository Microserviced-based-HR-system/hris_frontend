import React, { useState } from 'react';
import applicationData from 'common/helpers/applicationData.ts';
import IApplication from 'types/application.type';

const CandidatePipeline: React.FC = () => {
   const [jobs, setJobs] = useState<IApplication[]>(applicationData);

   const borderColors = {
      applied: 'border-b-4 border-blue-500',
      shortlisted: 'border-b-4 border-green-500',
      screening: 'border-b-4 border-yellow-500',
      interview: 'border-b-4 border-pink-500',
      jobOffered: 'border-b-4 border-purple-500',
   };

   return (
      <div className="p-3 grid grid grid-cols-5 gap-4">
         {[
            { status: 'applied', title: 'Applied' },
            { status: 'shortlisted', title: 'Shortlisted' },
            { status: 'screening', title: 'Screening' },
            { status: 'interview', title: 'Interview' },
            { status: 'jobOffered', title: 'Job Offered' },
         ].map((category) => (
            <div key={category.status} className="p-0 card job_stage">
               {/* <div className={`text-l p-3  ${borderColors[category.status]}`}> */}
               <div
                  className={`text-xl p-3 ${
                     borderColors[category.status as keyof typeof borderColors]
                  }`}
               >
                  {category.title}
               </div>

               <div className="grid grid-cols-1 gap-3 p-1 ">
                  {jobs
                     .filter((job) => job.status === category.status)
                     .map((job) => (
                        <div
                           key={job.id}
                           className="p-4 border rounded-md shadow-md bg-white dark:text-white"
                        >
                           <p className="">{job.title}</p>
                           {/* Add additional job information here */}
                        </div>
                     ))}
               </div>
            </div>
         ))}
      </div>
   );
};

export default CandidatePipeline;
