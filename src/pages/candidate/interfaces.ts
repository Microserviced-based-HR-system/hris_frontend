export interface IWorkExperience {
   companyName: string;
   jobTitle: string;
   country: string;
   noticePeriod: string;
   totalExpInYears: string;
   keySkills: string;
}

export interface IEducationDetail {
   highestQualification: string;
   specialization: string;
   university: string;
   yearOfGraduation: string;
   educationType: string;
}

export interface IJobPreference {
   industry: string;
   preferredRole: string;
   preferredLocation: string;
}

export interface IJob {
   id: string;
   title: string;
   job_type: string;
   company_id: string;
   description: string;
   requirements: string;
   location: string;
   status: string;
}

export interface ICandidateProfile {
   name: string;
   email: string;
   mobileNo: string;
   workExperiences: IWorkExperience[];
   educationDetails: IEducationDetail[];
   jobPreferences: IJobPreference[];
   jobs: IJob[];
}

export const CANDIDATE_SERVICE = import.meta.env.VITE_CANDIDATE_API_END_POINT;
