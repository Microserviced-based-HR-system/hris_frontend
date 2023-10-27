import IDepartment from 'types/department.type';
import IEmpRole from 'types/empRole.type';
export default interface IEmployee {
   employeeId: string;
   fullName: string;
   email: string;
   companyId: number;
   departmentId: string;
   address: string;
   contactNumber: string;
   dob: string;
   startDate: string;
   endDate: string;
   jobGradeId: string;
   bankAccount: string;
   salary: number;
   userId: string;
   empRoles: Array<IEmpRole>;
   department: IDepartment;
}
