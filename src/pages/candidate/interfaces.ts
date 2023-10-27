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
   candidate: string;
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

// export const CANDIDATE_SERVICE =
//    'http://a41866c1e8daa4078be0f25bcd61be4e-1321747920.ap-southeast-1.elb.amazonaws.com';

export const CANDIDATE_SERVICE =
   'http://candidate-svc-elb-c791d80b6acc7885.elb.ap-southeast-1.amazonaws.com';
