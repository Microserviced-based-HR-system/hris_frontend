import IEmployee from 'types/employee.type';
export default interface ILeave {
   id?: string | null;
   startDate: string;
   endDate: string;
   status: string;
   leaveType: string;
   requestedDays: number;
   employee: IEmployee;
}
