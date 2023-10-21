// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { get } from 'lodash';

const EducationDetailsForm: React.FC = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>('');

   const queryName = 'candidate';

   const initialValues: {
      highestQualification: string;
      specialization: string;
      university: string;
      yearOfGraduation: string;
      educationType: string;
   } = {
      highestQualification: '',
      specialization: '',
      university: '',
      yearOfGraduation: '',
      educationType: '',
   };

   const validationSchema = Yup.object().shape({
      highestQualification: Yup.string().required('This field is required!'),
      specialization: Yup.string().required('This field is required!'),
      university: Yup.string().required('This field is required!'),
      yearOfGraduation: Yup.string().required('This field is required!'),
      educationType: Yup.string().required('This field is required!'),
   });

   const client = new ApolloClient({
      uri: 'http://localhost:8080/api/candidate/graphql',
      cache: new InMemoryCache(),
   });
   const handleCandidate = (formValue: {
      highestQualification: string;
      specialization: string;
      university: string;
      yearOfGraduation: string;
      educationType: string;
   }) => {
      const { highestQualification, specialization, university, yearOfGraduation, educationType } =
         formValue;

      setMessage('');
      setLoading(true);
      const educationDetail = {
         highestQualification: highestQualification,
         specialization: specialization,
         university: university,
         yearOfGraduation: yearOfGraduation,
         educationType: educationType,
      };

      const doucmentToSave = {
         name: 'Mya Pwint',
         email: 'myapwint@gmail.com',
         mobileNo: '6512345678',
         educationDetails: [educationDetail],
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
                     <p className="mb-6 font-bold text-primary">Education Detail</p>
                     <div className="flex flex-1">
                        <div>
                           <label htmlFor="highestQualification">Highest Qualification</label>
                           <Field as="select" name="highestQualification">
                              <option value="Master">Master</option>
                              <option value="Bachelor">Bachelor</option>
                              <option value="Diploma">Diploma</option>
                           </Field>
                           <ErrorMessage
                              name="highestQualification"
                              component="div"
                              className="alert alert-danger"
                           />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="specialization">Specialization</label>
                        <Field as="select" name="specialization">
                           <option value="Software Engineering">Software Engineering</option>
                           <option value="Banking and Finance">Banking and Finance</option>
                           <option value="Health Sciece">Health Sciece</option>
                           <option value="Cyper Security">Cyper Security</option>
                           <option value="Artificial Intelligence">Artificial Intelligence</option>
                           <option value="Machine Learning">Machine Learning</option>
                           <option value="Data Science">Data Science</option>
                        </Field>
                        <ErrorMessage
                           name="specialization"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>
                     <div>
                        <label htmlFor="university">University</label>
                        <Field as="select" name="university">
                           <option value="National University of Singapore">
                              National University of Singapore
                           </option>
                           <option value="Nanyang Technological University">
                              Nanyang Technological University
                           </option>
                           <option value="Tsinghua University">Tsinghua University</option>
                           <option value="Peking University">Peking University</option>
                           <option value="The University of Hong Kong (HKU)">
                              The University of Hong Kong (HKU)
                           </option>
                           <option value="Zhejiang University">Zhejiang University</option>
                           <option value="Seoul National University">
                              Seoul National University
                           </option>
                        </Field>
                        <ErrorMessage
                           name="university"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <label htmlFor="yearOfGraduation">Year Of Graduation</label>
                        <Field as="select" name="yearOfGraduation">
                           <option value="2023">2023</option>
                           <option value="2022">2022</option>
                           <option value="2021">2021</option>
                           <option value="2020">2020</option>
                           <option value="2019">2019</option>
                           <option value="2018">2018</option>
                           <option value="2017">2017</option>
                        </Field>
                        <ErrorMessage
                           name="yearOfGraduation"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <label htmlFor="educationType">Education Type</label>
                        <Field as="select" name="educationType">
                           <option value="Full Time">Full Time</option>
                           <option value="Part Time">Part Time</option>
                        </Field>
                        <ErrorMessage
                           name="educationType"
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

export default EducationDetailsForm;
