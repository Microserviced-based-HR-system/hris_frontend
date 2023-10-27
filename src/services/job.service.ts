// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import httpClient from 'common/http/httpClient';
import authHeader from './auth-header';
const jobApiEndPoint = import.meta.env.VITE_JOB_API_END_POINT;
const client = new httpClient(jobApiEndPoint);

export const getJobList = () => {
   alert('endpoint' + jobApiEndPoint);
   return client
      .get('/jobs', { headers: authHeader() })
      .then((response) => response.data)
      .catch((error) => {
         throw new Error(`Error fetching job list: ${error.message}`);
      });
};

export const getJobById = (id) => {
   return client.get('/jobs/' + id, { headers: authHeader() });
};

export const createApplication = (jobId) => {
   return client
      .post('/application', {
         data: {
            id: jobId,
            applicaton: {
               id: jobId,
            },
         },
      })
      .then((response) => {
         console.log(response.data);
         return response.data;
      });
};
