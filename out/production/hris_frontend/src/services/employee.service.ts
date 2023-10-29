import authHeader from './auth-header';
import httpClient from 'common/http/httpClient';
import IEmployee from 'types/employee.type';

const empApiEndPoint = import.meta.env.VITE_REACT_EMPLOYEE_API_END_POINT;
const emp_service_httpClient = new httpClient(empApiEndPoint);

export const getAllEmployees = () => {
   return emp_service_httpClient.get('/employees', { headers: authHeader() });
};
export const getAllEmpRoles = () => {
   return emp_service_httpClient.get('/company/empRoles', { headers: authHeader() });
};
export const getEmployeeByUserId = (userid: string) => {
   return emp_service_httpClient.get('/employee/userid/' + userid, { headers: authHeader() });
};
export const getEmployeeByEmail = (email: string) => {
   return emp_service_httpClient.get('/employee/email/' + email, { headers: authHeader() });
};
export const getEmployeeById = (companyId: number, employeeId: string) => {
   return emp_service_httpClient.get('/company/' + companyId + '/' + employeeId, {
      headers: authHeader(),
   });
};
//post
export const newEmployee = async (emp: IEmployee, companyId: number) => {
   try {
      const response = await emp_service_httpClient.post(`/company/${companyId}/employee`, {
         data: emp,
      });

      if ((response.data as ResponseData).token) {
         localStorage.setItem('newEmployee', JSON.stringify(response.data as IEmployee));
      }
      return response.data;
   } catch (error) {
      console.error('Error creating a new employee:', error);
      throw error;
   }
};

export const updateEmployee = async (companyId: number, employeeId: string, emp: IEmployee) => {
   console.log(employeeId);
   try {
      const response = await emp_service_httpClient.put(
         '/company/' + companyId + '/' + employeeId,
         {
            data: emp,
         },
      );

      if ((response.data as ResponseData).token) {
         localStorage.setItem('updateEmployee', JSON.stringify(response.data));
      }
      return response.data;
   } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
   }
};
