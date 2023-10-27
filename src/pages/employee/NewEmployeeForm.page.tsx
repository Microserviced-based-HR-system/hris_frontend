// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import IEmployee from 'types/employee.type';
// import IUser from 'types/user.type';
// import IEmpRole from 'types/empRole.type';
// import { newEmployee, getEmployeeByEmail } from 'services/employee.service';
// import { getCurrentUser } from 'services/auth.service';
// import { getUserByEmail } from 'services/user.service';
// import { useNavigate } from 'react-router-dom';

// const NewEmployeeForm = () => {
//    const navigate = useNavigate();
//    const currentUserEmail = getCurrentUser()?.email;
//    // const currentUserEmail = 'ted@gmail.com'; // Test account
//    const [Company, setCompany] = useState<number | undefined>(undefined);
//    const [User, setUser] = useState<IUser | undefined>(undefined);
//    const [emailInput, setEmailInput] = useState('');
//    const [formData, setFormData] = useState<IEmployee>({
//       fullName: '',
//       email: '',
//       companyId: 0,
//       departmentId: '',
//       address: '',
//       contactNumber: '',
//       dob: '',
//       startDate: '',
//       endDate: '',
//       jobGradeId: '',
//       bankAccount: '',
//       salary: 123,
//       userId: '',
//       employeeId: '',
//       empRoles: [{ id: '', name: '' }],
//       department: { departmentName: '', departmentId: '', companyId: 0, departmentDesc: '' },
//    });
//    const {
//       register,
//       handleSubmit,
//       formState: { errors },
//    } = useForm({
//       defaultValues: formData,
//    });

//    useEffect(() => {
//       // Get current company
//       getEmployeeByEmail(currentUserEmail)
//          .then((response) => {
//             const data: IEmployee = response.data as IEmployee;
//             // Ensure that data is not undefined and companyId is defined
//             if (data && data.companyId) {
//                setCompany(data.companyId | 1);
//             } else {
//                console.log('Company ID not found in response data');
//             }
//          })
//          .catch((error) => {
//             const resMessage =
//                (error.response && error.response.data && error.response.data.message) ||
//                error.message ||
//                error.toString();
//             console.log(resMessage);
//          });
//    }, [currentUserEmail]);

//    const fetchUserByEmail = () => {
//       if (emailInput.trim() !== '') {
//          getUserByEmail(emailInput)
//             .then((response) => {
//                const data: IUser = response.data as IUser;
//                if (data && data.id) {
//                   setUser(data);
//                } else {
//                   console.log('User not found in response data when finding by email');
//                }
//             })
//             .catch((error) => {
//                const resMessage =
//                   (error.response && error.response.data && error.response.data.message) ||
//                   error.message ||
//                   error.toString();
//                console.log(resMessage);
//             });
//       } else {
//          console.log('Email input is empty');
//       }
//    };

//    const onSubmit = (data: IEmployee) => {
//       fetchUserByEmail(); //find userId for new employee
//       if (Company !== undefined) {
//          data.companyId = Company;
//       }
//       if (User !== undefined && User !== null && User.id !== undefined && User.id !== null) {
//          data.userId = User.id;
//       }
//       console.log(data);
//       newEmployee(data, data.companyId)
//          .then(() => {
//             alert('You have successfully submitted the form');
//             navigate('/employees', { state: {} });
//          })
//          .catch((error) => {
//             const resMessage =
//                (error.response && error.response.data && error.response.data.message) ||
//                error.message ||
//                error.toString();
//             console.log('Error:', resMessage);
//             alert('Error in adding new employee');
//          });
//    };

//    return (
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20">
//          <div className="w-full bg-white rounded-lg shadow light:border md:mt-6 sm:max-w-md ">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
//                <h1 className="text-xl font-bold md:text-2xl">New Employee</h1>
//                <form onSubmit={handleSubmit(onSubmit)}>
//                   <div>
//                      <label>Full Name</label>
//                      <input
//                         type="text"
//                         {...register('fullName', { required: '*this field cannot be empty' })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.fullName} />
//                   </div>
//                   <div>
//                      <label>Email</label>
//                      <input
//                         type="email"
//                         {...register('email', { required: '*this field cannot be empty' })}
//                         value={emailInput}
//                         onChange={(e) => setEmailInput(e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.email} />
//                   </div>
//                   <div>
//                      <label>Contact Number</label>
//                      <input
//                         type="text"
//                         {...register('contactNumber', { required: '*this field cannot be empty' })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.contactNumber} />
//                   </div>
//                   <div>
//                      <label>Date of Birth</label>
//                      <input
//                         type="date"
//                         {...register('dob', { required: false })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.dob} />
//                   </div>
//                   <div>
//                      <label>Employment Start Date</label>
//                      <input
//                         type="date"
//                         {...register('startDate', { required: '*this field cannot be empty' })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.startDate} />
//                   </div>
//                   <div>
//                      <label>Bank Account</label>
//                      <input
//                         type="text"
//                         {...register('bankAccount', { required: '*this field cannot be empty' })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.bankAccount} />
//                   </div>
//                   <div>
//                      <label>Job Position</label>
//                      <input
//                         type="text"
//                         {...register('jobGradeId', { required: false })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.fullName} />
//                   </div>
//                   <div>
//                      <label>Address</label>
//                      <textarea
//                         //   type="textarea"
//                         style={{ height: '100px' }}
//                         placeholder="maximum 500 characters"
//                         {...register('address', {
//                            required: { value: true, message: '*Address cannot be empty' },
//                            maxLength: { value: 500, message: '*Maximum length allowed reached' },
//                         })}
//                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
//                      />
//                      <ErrorMessage error={errors.address} />
//                   </div>
//                   <div>
//                      <br></br>
//                      <br></br>
//                      <button
//                         type="submit"
//                         className="bg-indigo-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600"
//                         style={{ border: '2px solid', width: '100px', float: 'right' }}
//                      >
//                         Submit
//                      </button>
//                   </div>
//                   <br></br>
//                   <br></br>
//                </form>
//             </div>
//          </div>
//       </div>
//    );
// };

// const ErrorMessage = ({ error }) => {
//    return error ? <small style={{ color: 'red' }}>{error.message}</small> : null;
// };

// export default NewEmployeeForm;
