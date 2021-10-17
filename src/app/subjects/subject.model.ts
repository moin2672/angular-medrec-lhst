import { SubjectVisit } from './subject-visit.model';

export interface Subject {
  _id: string;
  subjectID: string;
  subjectAadhar: string;
  subjectName: string;
  subjectDOB: string;
  subjectGender: string;
  subjectAddress: string;
  subjectPhoneNo: string;
  subjectEmailID: string;
  lastUpdatedDate: string;
  subjectVisits: SubjectVisit[];
  creator: string;
}
