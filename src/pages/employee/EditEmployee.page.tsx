import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IEmployee from 'types/employee.type';
import IDepartment from 'types/department.type';
import IEmpRole from 'types/empRole.type';
import { getDepartments } from 'services/company.service';
import { updateEmployee, getAllEmpRoles } from 'services/employee.service';
import { useLocation, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
   const location = useLocation();
   const Employee: IEmployee = location.state.data;
   const [Dept, setDept] = useState<IDepartment[]>([]);
   const [EmpRoles, setEmpRoles] = useState<IEmpRole[]>([]);

   const navigate = useNavigate();
   //format string to date to display in form
   const formatDate = (dateString: string) => {
      if (!dateString) {
         return null;
      } //not to display default date for null value
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const departmentsResponse = await getDepartments(Employee.companyId);
            const empRolesResponse = await getAllEmpRoles();

            const departments = departmentsResponse.data as IDepartment[];
            const empRoles = empRolesResponse.data as IEmpRole[];

            setDept(departments);
            setEmpRoles(empRoles);
         } catch (error) {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();
            console.log(resMessage);
         }
      };

      fetchData();
   }, [Employee.companyId]);

   const [formData, setFormData] = useState<IEmployee>({
      employeeId: Employee.employeeId,
      fullName: Employee.fullName,
      email: Employee.email,
      companyId: Employee.companyId,
      departmentId: Employee.departmentId,
      department: Employee.department || { departmentName: '', departmentId: '' },
      address: Employee.address,
      contactNumber: Employee.contactNumber,
      dob: Employee.dob,
      startDate: Employee.startDate,
      endDate: Employee.endDate,
      jobGradeId: Employee.jobGradeId,
      bankAccount: Employee.bankAccount,
      salary: Employee.salary,
      userId: Employee.userId,
      empRoles: Employee.empRoles,
   });
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: formData,
   });

   const deptOptions = () => {
      return Dept.map((d) => {
         return (
            <option key={d.departmentId} value={d.departmentName}>
               {d.departmentName}
            </option>
         );
      });
   };
   const roleOptions = () => {
      return EmpRoles.map((role) => (
         <option key={role.id} value={role.name}>
            {role.name}
         </option>
      ));
   };

   const onSubmit = async (data: IEmployee) => {
      try {
         //set formData.empRoles as IEmpRole
         const newRoles: IEmpRole | undefined = EmpRoles.find(
            (role) => role.name === data.empRoles[0].name,
         );
         const defaultRole: IEmpRole = EmpRoles.find((role) => role.name === 'EMPLOYEE_ROLE') || {
            id: '',
            name: 'EMPLOYEE_ROLE',
         };
         if (newRoles) {
            data.empRoles = [newRoles];
         } else {
            data.empRoles = [defaultRole];
         }
         const selectedDept: IDepartment = Dept.find(
            (dep) => dep.departmentId === data.departmentId,
         ) as IDepartment;
         const existDept: IDepartment = Dept.find(
            (dep) => dep.departmentId === Employee.departmentId,
         ) as IDepartment;
         data.department = selectedDept || existDept;
         updateEmployee(data.companyId, data.employeeId, data)
            .then(() => {
               alert('You have updated successfully');
               navigate('/employees', { state: {} });
            })
            .catch((error) => {
               const resMessage =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
               console.log('Error:', resMessage);
               alert('Unable to update employee information');
            });
      } catch (error) {
         const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
         console.log('Error:', resMessage);
         alert('Error in employee information to be updated');
      }
   };
   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20">
         <div className="w-full bg-white rounded-lg shadow light:border md:mt-6 sm:max-w-md ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
               <h1 className="text-xl font-bold md:text-2xl">New Employee</h1>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <br></br>
                  <div className="text-l text-center">------Personnel Information------</div>
                  <div>
                     <label>Full Name</label>
                     <input
                        type="text"
                        {...register('fullName', { required: '*this field cannot be empty' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.fullName} />
                  </div>
                  <div>
                     <label>Email</label>
                     <input
                        type="email"
                        {...register('email', { required: '*this field cannot be empty' })}
                        value={Employee.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.email} />
                  </div>
                  <div>
                     <label>Contact Number</label>
                     <input
                        type="text"
                        {...register('contactNumber', { required: '*this field cannot be empty' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.contactNumber} />
                  </div>
                  <div>
                     <label>Date of Birth</label>
                     <input
                        type="date"
                        {...register('dob', { required: false })}
                        value={formatDate(Employee.dob) || ''} // Use the formatDate function to display the date
                        onChange={(e) => {
                           setFormData({
                              ...formData,
                              dob: e.target.value,
                           });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.dob} />
                  </div>
                  <div>
                     <label>Bank Account</label>
                     <input
                        type="text"
                        {...register('bankAccount', { required: '*this field cannot be empty' })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.bankAccount} />
                  </div>
                  <div>
                     <label>Address</label>
                     <textarea
                        //type="textarea"
                        style={{ height: '100px' }}
                        placeholder="maximum 500 characters"
                        {...register('address', {
                           required: { value: true, message: '*Address cannot be empty' },
                           maxLength: { value: 500, message: '*Maximum length allowed reached' },
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.address} />
                  </div>
                  <br></br>
                  <div className="text-l text-center">------Employment Details------</div>
                  <div>
                     <label>Employment Start Date</label>
                     <input
                        type="date"
                        {...register('startDate', { required: false })}
                        value={formatDate(Employee.startDate) || ''} // Use the formatDate function to display the date
                        onChange={(e) => {
                           setFormData({
                              ...formData,
                              startDate: e.target.value,
                           });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.dob} />
                  </div>
                  <div>
                     <label>Employment End Date</label>
                     <input
                        type="date"
                        {...register('endDate', { required: false })}
                        value={formatDate(Employee.endDate) || ''} // Use the formatDate function to display the date
                        onChange={(e) => {
                           setFormData({
                              ...formData,
                              endDate: e.target.value,
                           });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.dob} />
                  </div>
                  <div>
                     <label>Department</label>
                     <select
                        className="w-full"
                        {...register('departmentId', { required: '*this field cannot be empty' })}
                     >
                        {deptOptions()}
                        <option value="" className="text-slate-400 text-sm">
                           Current:{' '}
                           {(formData.department && formData.department.departmentName) || null}
                        </option>
                     </select>
                     <ErrorMessage error={errors.departmentId} />
                  </div>
                  <div>
                     <label>Job Position</label>
                     <input
                        type="text"
                        {...register('jobGradeId', { required: false })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                     />
                     <ErrorMessage error={errors.fullName} />
                  </div>
                  <div>
                     <label>Employee Role</label>
                     <select className="w-full" {...register('empRoles', { required: true })}>
                        {roleOptions()}
                        <option value="" className="text-slate-400 text-sm">
                           Current:{' '}
                           {(formData.empRoles &&
                              formData.empRoles[0] &&
                              formData.empRoles[0].name) ||
                              null}
                        </option>
                     </select>
                  </div>

                  <div>
                     <br></br>
                     <br></br>
                     <button
                        type="submit"
                        className="bg-indigo-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600"
                        style={{ border: '2px solid', width: '100px', float: 'right' }}
                     >
                        Submit
                     </button>
                  </div>
                  <br></br>
                  <br></br>
               </form>
            </div>
         </div>
      </div>
   );
};
const ErrorMessage = ({ error }) => {
   return error ? <small style={{ color: 'red' }}>{error.message}</small> : null;
};
export default EditEmployee;
