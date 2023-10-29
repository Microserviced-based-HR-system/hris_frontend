import IEmployee from 'types/employee.type';
import IDepartment from 'types/department.type';
import React, { useState, useEffect } from 'react';
import { getEmployeeByDepartmentId } from 'services/company.service';
import { useLocation } from 'react-router-dom';

const DeptEmployees = () => {
   const location = useLocation();
   const Emp: IEmployee = location.state.data;
   const Dept: IDepartment = Emp.department;
   const [DeptEmployee, setDeptEmployee] = useState<IEmployee[]>([]);

   useEffect(() => {
      console.log(Dept);
      const fetchDeptEmployee = async () => {
         getEmployeeByDepartmentId(Dept.departmentId as string).then(
            (response) => {
               const data: IEmployee[] = response.data as IEmployee[];
               setDeptEmployee(data);
            },
            (error) => {
               const resMessage =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
               console.log(resMessage);
            },
         );
      };
      fetchDeptEmployee();
   }, [Dept]);

   const renderDeptEmployee = () => {
      return DeptEmployee.map((emp: IEmployee) => {
         return (
            <tr key={emp.employeeId}>
               <td className="border-2 rounded">{emp.fullName}</td>
               <td className="border-2 rounded">{emp.email}</td>
               <td className="border-2 rounded">{emp.contactNumber}</td>
               <td className="border-2 rounded"> </td>
            </tr>
         );
      });
   };

   return (
      <div className="flex flex-col items-center justify-center">
         <h1 className="text-2xl">{Dept.departmentName}</h1>
         <p className="text-sm my-5">{Dept.departmentDesc}</p>
         <table className="w-full text-left border-8 border-double rounded">
            <thead className="table-header-group bg-violet-200">
               <tr className="">
                  <th className="border-2 rounded">Employee Name</th>
                  <th className="border-2 rounded">Email</th>
                  <th className="border-2 rounded">Contact Number</th>
                  <th className="border-2 rounded">Position</th>
               </tr>
            </thead>
            <tbody className="justify-start">{renderDeptEmployee()}</tbody>
         </table>
      </div>
   );
};
export default DeptEmployees;
