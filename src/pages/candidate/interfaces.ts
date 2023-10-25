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
   'http://candidate-service-elb-75ad0e5732fe6e19.elb.ap-southeast-1.amazonaws.com';
