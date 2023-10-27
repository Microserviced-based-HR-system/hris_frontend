import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import IEmployee from 'types/employee.type';
import { getAllCompanyEmployees } from 'services/company.service';
import { getEmployeeByEmail } from 'services/employee.service';
import { FiEdit2, FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'services/auth.service';

const AllEmployees = () => {
   const currentUserEmail = getCurrentUser()?.email;
   //const currentUserEmail = 'ted@gmail.com'; //test account
   const [Employee, setEmployee] = useState<IEmployee[]>([]);
   const [CurEmp, setCurEmp] = useState<IEmployee>();
   const navigate = useNavigate();

   useEffect(() => {
      getEmployeeByEmail(currentUserEmail).then(
         (response) => {
            const data: IEmployee = response.data as IEmployee;
            setCurEmp(data);
         },
         (error) => {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();
            console.log(resMessage);
         },
      );
   }, [currentUserEmail]);

   // This useEffect will run whenever CurEmp changes
   useEffect(() => {
      // console.log(CurEmp);
      //to run only if CurEmp is defined
      if (CurEmp) {
         const fetchEmployees = async () => {
            getAllCompanyEmployees(CurEmp.companyId).then(
               (response) => {
                  const data: IEmployee[] = response.data as IEmployee[];
                  setEmployee(data);
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
         fetchEmployees();
      }
   }, [CurEmp]);
   return (
      <div>
         <div className="grid grid-cols-2">
            <h1 className="ml-0 text-2xl m-10">All Employees</h1>
            <button
               type="submit"
               className="min-h-fit min-w-fit bg-indigo-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600"
               style={{ border: '2px solid', width: '100px', float: 'right', marginLeft: 'auto' }}
               onClick={() => {
                  newEmployee();
               }}
            >
               New Employee
            </button>
         </div>
         <ListGroup>
            {Employee.map((data) => (
               <div className="border" key={data.employeeId}>
                  <ListGroup.Item className="text-xl my-8 pl-8 btn">
                     <div className="grid grid-flow-row-dense grid-cols-4 gap-1 ...">
                        {' '}
                        {data.fullName}
                        <div className="text-base col-start-2">{data.email}</div>
                        <div
                           className="text-base col-start-3 btn underline"
                           title="Department Details"
                           onClick={() => {
                              data.department?.departmentName ? detailDepartment(data) : null;
                           }}
                        >
                           {data.department?.departmentName}
                        </div>
                        <div className="col-start-4 grid grid-flow-row-dense grid-cols-2">
                           <FiBookOpen
                              title="Detail"
                              className="btn"
                              onClick={() => {
                                 detailEmployee(data);
                              }}
                           />
                           <FiEdit2
                              title="Edit"
                              className="btn col-start-2"
                              onClick={() => {
                                 editEmployee(data);
                              }}
                           />
                        </div>
                     </div>
                  </ListGroup.Item>
               </div>
            ))}
         </ListGroup>
      </div>
   );
   function detailEmployee(data: IEmployee) {
      navigate('/detail_employee', { state: { data } });
   }
   function editEmployee(data: IEmployee) {
      navigate('/edit_employee', { state: { data } });
   }
   function newEmployee() {
      navigate('/new_employee', { state: {} });
   }
   function detailDepartment(data: IEmployee) {
      const emp = Employee.find((e) => e.employeeId === data.employeeId);
      console.log('from routing' + emp);
      navigate('/department/employees', { state: { emp } });
   }
};
export default AllEmployees;
