import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { get } from 'lodash';
import { CANDIDATE_SERVICE } from './interfaces';
const JobPreferenceForm: React.FC = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>('');

   const queryName = 'candidate';

   const initialValues: {
      industry: string;
      preferredRole: string;
      preferredLocation: string;
   } = {
      industry: '',
      preferredRole: '',
      preferredLocation: '',
   };

   const validationSchema = Yup.object().shape({
      industry: Yup.string().required('This field is required!'),
      preferredRole: Yup.string().required('This field is required!'),
      preferredLocation: Yup.string().required('This field is required!'),
   });

   const client = new ApolloClient({
      uri: CANDIDATE_SERVICE + '/api/candidate/graphql',
      cache: new InMemoryCache(),
   });

   const handleCandidate = (formValue: {
      industry: string;
      preferredRole: string;
      preferredLocation: string;
   }) => {
      const { industry, preferredRole, preferredLocation } = formValue;

      setMessage('');
      setLoading(true);
      const jobPreference = {
         industry: industry,
         preferredRole: preferredRole,
         preferredLocation: preferredLocation,
      };

      const doucmentToSave = {
         name: 'Mya Pwint',
         email: 'myapwint@gmail.com',
         mobileNo: '6512345678',
         jobPreferences: [jobPreference],
      };

      console.log(JSON.stringify(doucmentToSave).replace(/"/g, "'"));

      client
         .query({
            query: gql`
                {
                    graphqlClient{
                        save(
                            requestForm: {
                                apiName: "${queryName}"
                                payload:"{'document':${JSON.stringify(doucmentToSave).replace(
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
               code: get(result, 'data.graphqlClient.save.status.code', null),
               message: get(result, 'data.graphqlClient.save.status.message', null),
            };

            if (status?.code !== 200 && status?.code !== 401) {
               setLoading(false);
               setMessage(status.message);
               return;
            }

            setLoading(true);
            setMessage(status.message);

            return;
         });
   };

   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
         <div className="w-full bg-white rounded-lg shadow light:border md:mt-6 sm:max-w-md mb-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleCandidate}
               >
                  <Form className="space-y-4 md:space-y-6">
                     <p className="mb-6 font-bold text-primary">Job Preferences</p>
                     <div>
                        <label htmlFor="industry">Industry</label>
                        <Field as="select" name="industry">
                           <option value="IT/Computers - Software">IT/Computers - Software</option>
                           <option value="Hospitals/Healthcare/Diagnostics">
                              Hospitals/Healthcare/Diagnostics
                           </option>
                           <option value="Banking/Accounting/Financial Services">
                              Banking/Accounting/Financial Services
                           </option>
                           <option value="Logistics/Courier/Freight/Transportation">
                              Logistics/Courier/Freight/Transportation
                           </option>
                        </Field>
                        <ErrorMessage
                           name="industry"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <label htmlFor="preferredRole">Preferred Role</label>
                        <Field
                           name="preferredRole"
                           type="text"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                           name="preferredRole"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <label htmlFor="preferredLocation">Preferred Location</label>
                        <Field
                           name="preferredLocation"
                           type="text"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                           name="preferredLocation"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <button
                           type="submit"
                           className="bg-indigo-600 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded"
                           disabled={loading}
                        >
                           {loading && <span className="spinner-border spinner-border-sm"></span>}
                           Save and Continue
                        </button>
                     </div>

                     {message && (
                        <div>
                           <div className="alert alert-danger" role="alert">
                              {message}
                           </div>
                        </div>
                     )}
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default JobPreferenceForm;
