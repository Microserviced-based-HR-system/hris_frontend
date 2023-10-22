import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import moment from 'moment';
import { get } from 'lodash';
import { CANDIDATE_SERVICE } from './interfaces';
const WorkExperienceForm: React.FC = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>('');

   const queryName = 'candidate';

   const initialValues: {
      companyName: string;
      jobTitle: string;
      country: string;
      noticePeriod: string;
      totalExpInYears: string;
      keySkills: string;
   } = {
      companyName: '',
      jobTitle: '',
      country: '',
      noticePeriod: '',
      totalExpInYears: '',
      keySkills: '',
   };

   const validationSchema = Yup.object().shape({
      companyName: Yup.string().required('This field is required!'),
      jobTitle: Yup.string().required('This field is required!'),
      country: Yup.string().required('This field is required!'),
      noticePeriod: Yup.string().required('This field is required!'),
      totalExpInYears: Yup.string().required('This field is required!'),
      keySkills: Yup.string().required('This field is required!'),
   });

   const client = new ApolloClient({
      uri: CANDIDATE_SERVICE + '/api/candidate/graphql',
      cache: new InMemoryCache(),
   });

   const handleCandidate = (formValue: {
      companyName: string;
      jobTitle: string;
      country: string;
      noticePeriod: string;
      totalExpInYears: string;
      keySkills: string;
   }) => {
      const { companyName, jobTitle, country, noticePeriod, totalExpInYears, keySkills } =
         formValue;

      setMessage('');
      setLoading(true);
      const workexperience = {
         companyName: companyName,
         jobTitle: jobTitle,
         location: country,
         noticePeriod: noticePeriod,
         totalExpInYears: totalExpInYears,
         keySkills: keySkills,
      };

      const doucmentToSave = {
         name: 'Mya Pwint',
         email: 'myapwint@gmail.com',
         mobileNo: '6512345678',
         workExperiences: [workexperience],
         createdBy: 'System',
         createdOn: moment(new Date()).utc(),
         modifiedBy: 'System',
         modifiedOn: moment(new Date()).utc(),
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
                     <p className="mb-6 font-bold text-primary">Work Experiences</p>
                     <div className="flex flex-1">
                        <div className="pr-6">
                           <div>
                              <label htmlFor="companyName">Company Name</label>
                              <Field
                                 name="companyName"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="companyName"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>

                           <div>
                              <label htmlFor="jobTitle">Job Title</label>
                              <Field
                                 name="jobTitle"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="jobTitle"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>

                           <div>
                              <label htmlFor="totalExpInYears">Total Experience in Years</label>
                              <Field
                                 name="totalExpInYears"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="totalExpInYears"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>
                        </div>
                        <div className="h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"></div>
                        <div>
                           <div>
                              <label htmlFor="country">Country</label>
                              <Field as="select" name="country">
                                 <option value="Singapore">Singapore</option>
                                 <option value="Canada">Canada</option>
                                 <option value="UK">UK</option>
                              </Field>
                              <ErrorMessage
                                 name="country"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>

                           <div>
                              <label htmlFor="noticePeriod">Notice Period</label>
                              <Field
                                 name="noticePeriod"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="noticePeriod"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>
                           <div>
                              <label htmlFor="keySkills">Key Skills</label>
                              <Field
                                 as="textarea"
                                 name="keySkills"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="keySkills"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>
                        </div>
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

export default WorkExperienceForm;