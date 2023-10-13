import IDepartment from 'types/department.type';
export default interface IEmployee {
   employeeId?: string | null;
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
   empRoles: Array<string>;
   department: IDepartment;
}
