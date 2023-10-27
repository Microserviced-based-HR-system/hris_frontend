import authHeader from './auth-header';
import httpClient from 'common/http/httpClient';

const empApiEndPoint = import.meta.env.VITE_REACT_EMPLOYEE_API_END_POINT;
const emp_service_httpClient = new httpClient(empApiEndPoint);

export const getAllCompany = () => {
   return emp_service_httpClient.get('/company', { headers: authHeader() });
};

export const getCompanyById = (id: string) => {
   return emp_service_httpClient.get('/company/' + id, { headers: authHeader() });
};

export const getAllCompanyEmployees = (id: number) => {
   return emp_service_httpClient.get('/company/' + id + '/employees', { headers: authHeader() });
};

export const getDepartment = (deptId: string) => {
   return emp_service_httpClient.get('/company/department/' + deptId, { headers: authHeader() });
};

export const getEmployeeByDepartmentId = (deptId: string) => {
   return emp_service_httpClient.get('/company/department/' + deptId + '/employees', {
      headers: authHeader(),
   });
};

export const getDepartments = (compId: number) => {
   return emp_service_httpClient.get('/company/' + compId + '/departments', {
      headers: authHeader(),
   });
};
