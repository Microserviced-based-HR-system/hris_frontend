export default interface ILeaveRequest {
   id: string;
   reason: string | null;
   leave_type: string;
   start_date: string;
   created_by: string;
   created_on: string;
   employee_id: string;
   requested_days: number;
   modified_on: string;
   modified_by: string;
   status: string;
   comment: string | null;
   end_date: string;
}
