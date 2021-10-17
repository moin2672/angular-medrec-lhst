import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sub } from './sub.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/subjects';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjects: Sub[] = [];
  private subjectsUpdated = new Subject<{
    subjects: Sub[];
    subjectCount: number;
  }>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getSubjects(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&currentpage=${currentPage}`;
    console.log(queryParams);
    this.httpClient
      .get<{ message: string; subjects: Sub[]; maxSubjects: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((subjectData) => {
          return {
            subjects: subjectData.subjects.map((subject) => {
              return {
                subjectAadhar: subject.subjectAadhar,
                subjectName: subject.subjectName,
                _id: subject._id,
                creator: subject.creator,
              };
            }),
            maxSubjects: subjectData.maxSubjects,
          };
        })
      )
      .subscribe((transformedSubjectData) => {
        this.subjects = transformedSubjectData.subjects;
        console.log({
          subjects: [...this.subjects],
          subjectCount: transformedSubjectData.maxSubjects,
        });
        this.subjectsUpdated.next({
          subjects: [...this.subjects],
          subjectCount: transformedSubjectData.maxSubjects,
        });
      });
  }

  getSubjectUpdateListener() {
    return this.subjectsUpdated.asObservable();
  }

  addSubject(subjectAadhar: string, subjectName: string) {
    const subject: Sub = {
      _id: null,
      subjectAadhar: subjectAadhar,
      subjectName: subjectName,
      creator: null,
    };
    this.httpClient
      .post<{ message: string; subject: Sub }>(BACKEND_URL, subject)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  getSubject(subjecttId: string) {
    return this.httpClient.get<{
      _id: string;
      subjectAadhar: string;
      subjectName: string;
      creator: string;
    }>(BACKEND_URL + '/' + subjecttId);
  }

  updateSubject(_id: string, subjectAadhar: string, subjectName: string) {
    const subject: Sub = {
      _id: _id,
      subjectAadhar: subjectAadhar,
      subjectName: subjectName,
      creator: null,
    };
    this.httpClient.put(BACKEND_URL + '/' + _id, subject).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.info('put method subject service completed');
      },
    });
  }

  deleteSubject(subjectId: string) {
    return this.httpClient.delete(BACKEND_URL + '/' + subjectId);
  }
}
