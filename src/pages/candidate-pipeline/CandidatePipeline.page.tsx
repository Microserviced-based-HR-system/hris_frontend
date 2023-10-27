import React, { useState } from 'react';
import applicationData from 'common/helpers/applicationData.ts';
import * as AuthService from '../../services/auth.service';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { CANDIDATE_SERVICE, ICandidateProfile, IJob } from 'pages/candidate/interfaces';
import { get } from 'lodash';

const CandidatePipeline: React.FC = () => {
   const currentUser = AuthService.getCurrentUser();
   const queryName = 'candidate';
   const filters =
      currentUser.username === 'admin'
         ? []
         : [{ filterField: 'email', filterText: currentUser.email }];

   const client = new ApolloClient({
      uri: CANDIDATE_SERVICE + '/api/candidate/graphql',
      cache: new InMemoryCache(),
   });

   {
      client
         .query({
            query: gql`
            {
                graphqlClient{
                    fetch(
                        requestForm: {
                            apiName: "${queryName}"
                            payload:"{'filters':${JSON.stringify(filters).replace(
                               /"/g,
                               "'",
                            )},'pageSize':5,'pageIndex':0}"
                        }
                    ){
                        status {
                            code
                            message
                        }
                        data
                    }
            
                }
            }
`,
         })
         .then((result) => {
            console.log(result);
            const status = {
               code: get(result, 'data.graphqlClient.fetch.status.code', null),
               message: get(result, 'data.graphqlClient.fetch.status.message', null),
            };

            const list: ICandidateProfile[] = JSON.parse(
               result.data.graphqlClient.fetch.data,
            ) as ICandidateProfile[];

            if (currentUser.username === 'admin') {
               console.log(list);
               const applicationData: IJob[] = [];
               list.forEach((candidate) => {
                  candidate.jobs?.forEach((job) => {
                     console.log(candidate.email);
                     const j: IJob = {
                        id: job.id,
                        company_id: job.company_id,
                        title: job.title,
                        job_type: job.job_type,
                        description: job.description,
                        requirements: job.requirements,
                        location: job.location,
                        status: job.status,
                        candidate: candidate.email,
                     };
                     applicationData.push(j);
                  });
               });
               setJobs(applicationData);
            } else {
               const applicationData: IJob[] = [];
               list.at(0)?.jobs.forEach((job) => {
                  const j: IJob = {
                     id: job.id,
                     company_id: job.company_id,
                     title: job.title,
                     job_type: job.job_type,
                     description: job.description,
                     requirements: job.requirements,
                     location: job.location,
                     status: job.status,
                     candidate: '',
                  };
                  applicationData.push(j);
               });
               setJobs(applicationData);
            }
         });
   }

   const [jobs, setJobs] = useState<IJob[]>(applicationData);

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
                           <p className="">
                              {' '}
                              {currentUser.username === 'admin'
                                 ? job.candidate + ', ' + job.title
                                 : job.title}{' '}
                           </p>
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
