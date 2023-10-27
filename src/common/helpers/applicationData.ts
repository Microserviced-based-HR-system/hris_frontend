import IApplication from 'types/application.type';
const applicationData: IApplication[] = [
   {
      id: 1,
      job: 'SE',
      title: 'Job Title 1',
      candidate: 'Candidate1',
      applicationDate: '1 Oct 2023',
      status: 'applied',
   },
   {
      id: 3,
      job: 'SE',
      title: 'Job Title 3',
      candidate: 'Candidate2',
      applicationDate: '5 Oct 2023',
      status: 'applied',
   },
   {
      id: 2,
      job: 'SE',
      title: 'Job Title 2',
      candidate: 'Candidate1',
      applicationDate: '21 Oct 2023',
      status: 'shortlisted',
   },
   // Add more job items with different statuses
];
export default applicationData;
