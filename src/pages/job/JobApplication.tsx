import React from 'react';

const JobApplication: React.FC = () => {
   return (
      <div className="card">
         <div className="mt-2 mb-4 flex items-center justify-between">
            <span className="text-[18px]">Job Applications</span>
         </div>
         <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="bg-gray-200 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                           Candidate
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                           Submission date
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                           Status
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                           <h5 className="font-medium text-black dark:text-white">Hsu</h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="text-black dark:text-white">Oct 25,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="inline-flex rounded-full bg-green-200 bg-opacity-1 py-1 px-3 text-sm font-medium text-success">
                              Submitted
                           </p>
                        </td>
                     </tr>
                     <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                           <h5 className="font-medium text-black dark:text-white">Thin</h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="text-black dark:text-white">Oct 24,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="inline-flex rounded-full bg-green-200 bg-opacity-1 py-1 px-3 text-sm font-medium text-success">
                              Screening
                           </p>
                        </td>
                     </tr>
                     <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                           <h5 className="font-medium text-black dark:text-white">Beng</h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="text-black dark:text-white">Oct 23,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="inline-flex rounded-full bg-red-200 bg-opacity-1 py-1 px-3 text-sm font-medium text-danger">
                              Rejected
                           </p>
                        </td>
                     </tr>
                     <tr>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                           <h5 className="font-medium text-black dark:text-white">Mya</h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="text-black dark:text-white">Oct 22,2023</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                           <p className="inline-flex rounded-full bg-yellow-200 bg-opacity-1 py-1 px-3 text-sm font-medium text-danger">
                              Draft
                           </p>
                        </td>
                     </tr>
                     <tr>
                        <td className="py-5 px-4 pl-9 xl:pl-11">
                           <h5 className="font-medium text-black dark:text-white">Zaw</h5>
                        </td>
                        <td className="py-5 px-4">
                           <p className="text-black dark:text-white">Oct 21,2023</p>
                        </td>
                        <td className="py-5 px-4">
                           <p className="inline-flex rounded-full bg-green-200 bg-opacity-1 py-1 px-3 text-sm font-medium text-warning">
                              Passed
                           </p>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default JobApplication;
