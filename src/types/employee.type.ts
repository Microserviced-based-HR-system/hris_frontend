export default interface IEmployee {
   id?: string | null;
   fullName: string;
   email: string;
   contactNumber: string;
   dateOfBirth: string;
   address: string;
   departmentId: string;
   departmentName: string;
   departHeadId: string;
   departHeadFullName: string;
   employmentStartDate: string;
   employmentEndDate: string | null;
   projectId: string | null;
   projectName: string | null;
   roles: string[];
   username: string;
}
