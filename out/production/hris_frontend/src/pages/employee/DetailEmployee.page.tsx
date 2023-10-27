import IEmployee from 'types/employee.type';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DetailEmployee = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const Emp: IEmployee = location.state.data;
   const formatDate = (dateString: string) => {
      if (!dateString) {
         return null;
      } //not to display default date for null value
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
   };
   console.log(Emp.empRoles[0].name);
   return (
      <div className="flex flex-col pl-10 items-left justify-center">
         <h1 className="text-2xl">{Emp.fullName}</h1>
         <p className="text-sm my-5">{Emp.email}</p>
         <h2 className="text-lg">Personal Details</h2>
         <p className="text-sm my-5">Address: {Emp.address}</p>
         <p className="text-sm my-5">Contact Number: {Emp.contactNumber}</p>
         <p className="text-sm my-5">Date of Birth: {formatDate(Emp?.dob)}</p>
         <h2 className="text-lg">Employment Details</h2>
         <p className="text-sm my-5">Employment Start Date: {formatDate(Emp.startDate)}</p>
         <p className="text-sm my-5">Bank Account: {Emp.bankAccount}</p>
         <p className="text-sm my-5">Base Salary: {Emp?.salary}</p>
         <p className="text-sm my-5">Department Name: {Emp?.department?.departmentName}</p>
         <p className="text-sm my-5">Employee Role: {Emp.empRoles[0].name}</p>
         <button
            type="submit"
            className="bg-indigo-500 text-gray-100 p-3 font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600"
            style={{ border: '2px solid', width: '100px', float: 'right' }}
            onClick={() => {
               editEmployee(Emp);
            }}
         >
            Edit
         </button>
      </div>
   );
   function editEmployee(data: IEmployee) {
      navigate('/edit_employee', { state: { data } });
   }
};
export default DetailEmployee;
