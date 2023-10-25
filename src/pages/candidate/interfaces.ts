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

export interface ICandidateProfile {
   name: string;
   email: string;
   mobileNo: string;
   workExperiences: IWorkExperience[];
   educationDetails: IEducationDetail[];
   jobPreferences: IJobPreference[];
}

export const CANDIDATE_SERVICE =
   'http://a41866c1e8daa4078be0f25bcd61be4e-1321747920.ap-southeast-1.elb.amazonaws.com';
