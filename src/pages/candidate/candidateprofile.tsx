import React from 'react';

import WorkExperienceForm from './workexperienceform';
import WorkExperienceGrid from './workexperiencegrid';
import JobPreferenceForm from './jobpreferenceform';
import JobPreferenceGrid from './jobpreferencegrid';
import EducationDetailsForm from './educationdetailsform';
import EducationDetailsGrid from './educationdetailsgrid';

const Candidate: React.FC = () => {
   return (
      <div>
         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
            Build Your Profile
         </h1>
         <div className="grid gap-4 grid-cols-3">
            <div>
               <EducationDetailsForm />
            </div>
            <div>
               <WorkExperienceForm />
            </div>
            <div>
               <JobPreferenceForm />
            </div>
            <div style={{ height: '200px' }}>
               <EducationDetailsGrid />
            </div>

            <div style={{ height: '200px' }}>
               <WorkExperienceGrid />
            </div>

            <div style={{ height: '200px' }}>
               <JobPreferenceGrid />
            </div>
         </div>
      </div>
   );
};

export default Candidate;
