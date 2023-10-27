// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import httpClient from 'common/http/httpClient';
import authHeader from './auth-header';

const client = new httpClient(
   'http://job-service-elb-de53cd8b61f351ee.elb.ap-southeast-1.amazonaws.com/api/v1/',
);

export const getJobList = () => {
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
