import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subscription } from 'rxjs';
import { Sub } from '../sub.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  pdata = [];
  private subjectSub: Subscription;
  totalPosts = 0; //total no of posts
  postsPerPage = 10; //current page
  currentPage = 1;
  pageSizeOptions = [10, 15, 20];
  userId: string;
  private authStatusSub: Subscription;
  /* checking the new pagination */
  totalPages = 0;
  // totalPages = Math.ceil(this.totalPosts / this.postsPerPage);
  forward = false;
  backward = false;
  //pdata = [
  //   {
  //       "id":123,
  //       "subjectID":"MEDREC001",
  //       "subjectAadhar":"123456789012",
  //       "subjectName":"Aslam",
  //       "subjectDOB":"01-JAN-1990",
  //       "subjectGender":"Male",
  //       "subjectAddress":"#21, ABC street, DEF Block, GHI city.",
  //       "subjectPhoneNo":"9988776655",
  //       "subjectEmailID":"aslam@gmail.com",
  //       "subjectVisits":[
  //           {
  //               "sv_visitedOn":"23-JAN-2021",
  //               "sv_Height":124,
  //               "sv_Weight":233,
  //               "sv_Temp":99,
  //               "sv_Pulse":88,
  //               "sv_Oxy":98,
  //               "sv_bp_sys":140,
  //               "sv_bp_dia":70,
  //               "sv_bp_symptoms":"Fever",
  //               "sv_bp_prescription":"Dolo 650",
  //               "sv_isLabreqd":false,
  //               "sv_lab":"",
  //               "sv_isScanReqd":false,
  //               "sv_scan":"",
  //               "sv_isFollowUp":false,
  //               "sv_nextDate":"",
  //               "sv_attachment":""
  //           }
  //       ]
  //   },
  //   {
  //       "id":123,
  //       "subjectID":"MEDREC002",
  //       "subjectAadhar":"123456789012",
  //       "subjectName":"Babu",
  //       "subjectDOB":"01-JAN-1990",
  //       "subjectGender":"Male",
  //       "subjectAddress":"#21, ABC street, DEF Block, GHI city.",
  //       "subjectPhoneNo":"9988776655",
  //       "subjectEmailID":"babu@gmail.com",
  //       "subjectVisits":[
  //           {
  //               "sv_visitedOn":"24-JAN-2021",
  //               "sv_Height":124,
  //               "sv_Weight":233,
  //               "sv_Temp":99,
  //               "sv_Pulse":88,
  //               "sv_Oxy":98,
  //               "sv_bp_sys":140,
  //               "sv_bp_dia":70,
  //               "sv_bp_symptoms":"Fever",
  //               "sv_bp_prescription":"Dolo 650",
  //               "sv_isLabreqd":false,
  //               "sv_lab":"",
  //               "sv_isScanReqd":false,
  //               "sv_scan":"",
  //               "sv_isFollowUp":false,
  //               "sv_nextDate":"",
  //               "sv_attachment":""
  //           },
  //           {
  //               "sv_visitedOn":"30-JAN-2021",
  //               "sv_Height":124,
  //               "sv_Weight":233,
  //               "sv_Temp":99,
  //               "sv_Pulse":88,
  //               "sv_Oxy":98,
  //               "sv_bp_sys":140,
  //               "sv_bp_dia":70,
  //               "sv_bp_symptoms":"Fever",
  //               "sv_bp_prescription":"Dolo 650",
  //               "sv_isLabreqd":false,
  //               "sv_lab":"",
  //               "sv_isScanReqd":false,
  //               "sv_scan":"",
  //               "sv_isFollowUp":true,
  //               "sv_nextDate":"02-JAN-2021",
  //               "sv_attachment":""
  //           }
  //       ]
  //   },
  //   {
  //     "id":123,
  //     "subjectID":"MEDREC003",
  //     "subjectAadhar":"123456789012",
  //     "subjectName":"Chand",
  //     "subjectDOB":"01-JAN-1990",
  //     "subjectGender":"Male",
  //     "subjectAddress":"#21, ABC street, DEF Block, GHI city.",
  //     "subjectPhoneNo":"9988776655",
  //     "subjectEmailID":"chand@gmail.com",
  //     "subjectVisits":[
  //         {
  //             "sv_visitedOn":"24-JAN-2021",
  //             "sv_Height":124,
  //             "sv_Weight":233,
  //             "sv_Temp":99,
  //             "sv_Pulse":88,
  //             "sv_Oxy":98,
  //             "sv_bp_sys":140,
  //             "sv_bp_dia":70,
  //             "sv_bp_symptoms":"Fever",
  //             "sv_bp_prescription":"Dolo 650",
  //             "sv_isLabreqd":false,
  //             "sv_lab":"",
  //             "sv_isScanReqd":false,
  //             "sv_scan":"",
  //             "sv_isFollowUp":false,
  //             "sv_nextDate":"",
  //             "sv_attachment":""
  //         },
  //         {
  //             "sv_visitedOn":"30-JAN-2021",
  //             "sv_Height":124,
  //             "sv_Weight":233,
  //             "sv_Temp":99,
  //             "sv_Pulse":88,
  //             "sv_Oxy":98,
  //             "sv_bp_sys":140,
  //             "sv_bp_dia":70,
  //             "sv_bp_symptoms":"Fever",
  //             "sv_bp_prescription":"Dolo 650",
  //             "sv_isLabreqd":false,
  //             "sv_lab":"",
  //             "sv_isScanReqd":false,
  //             "sv_scan":"",
  //             "sv_isFollowUp":true,
  //             "sv_nextDate":"02-JAN-2021",
  //             "sv_attachment":""
  //         },
  //         {
  //             "sv_visitedOn":"07-FEB-2021",
  //             "sv_Height":124,
  //             "sv_Weight":233,
  //             "sv_Temp":99,
  //             "sv_Pulse":88,
  //             "sv_Oxy":98,
  //             "sv_bp_sys":140,
  //             "sv_bp_dia":70,
  //             "sv_bp_symptoms":"Fever",
  //             "sv_bp_prescription":"Dolo 650",
  //             "sv_isLabreqd":false,
  //             "sv_lab":"",
  //             "sv_isScanReqd":false,
  //             "sv_scan":"",
  //             "sv_isFollowUp":true,
  //             "sv_nextDate":"02-MAR-2021",
  //             "sv_attachment":""
  //         }
  //     ]
  // }
  //];
  // data=[
  //   {"id":123,"subjectID":"MEDREC 001", "isFollowUp":true},
  //   {"id":456,"subjectID":"MEDREC 002", "isFollowUp":false},
  //   {"id":789,"subjectID":"MEDREC 003", "isFollowUp":true},
  //   {"id":321,"subjectID":"MEDREC 004", "isFollowUp":false},
  //   {"id":654,"subjectID":"MEDREC 005", "isFollowUp":true},
  //   {"id":987,"subjectID":"MEDREC 006", "isFollowUp":true}
  // ]
  constructor(
    private subjectService: SubjectService,
    private authService: AuthService
  ) {}
  onIncrement() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.subjectService.getSubjects(this.postsPerPage, this.currentPage);
      this.updatePagination();
    }
  }
  onDecrement() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.subjectService.getSubjects(this.postsPerPage, this.currentPage);
      this.updatePagination();
    }
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.totalPosts / this.postsPerPage);
    console.log('currentpage=', this.currentPage);
    console.log('totalPages=', this.totalPages);
    console.log('totalPosts=', this.totalPosts);
    console.log(Math.ceil(this.totalPosts / this.postsPerPage));
    if (this.currentPage <= 1) {
      if (this.totalPages <= 1) {
        // this.hide = true;
      } else {
        // this.hide = false;
        if (this.currentPage < this.totalPages) {
          this.forward = true;
          this.backward = false;
        }
      }
    } else {
      if (this.currentPage < this.totalPages) {
        this.forward = true;
        this.backward = true;
      }
      if (this.currentPage == this.totalPages) {
        this.forward = false;
        this.backward = true;
      }
    }
  }
  ngOnInit() {
    this.subjectService.getSubjects(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.subjectSub = this.subjectService
      .getSubjectUpdateListener()
      .subscribe((subjectData: { subjects: Sub[]; subjectCount: number }) => {
        this.pdata = subjectData.subjects;
        this.totalPosts = subjectData.subjectCount;
        this.updatePagination();
        console.log(subjectData);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  OnDelete(subjectId: string) {
    this.subjectService.deleteSubject(subjectId).subscribe({
      next: () => {
        this.subjectService.getSubjects(this.postsPerPage, this.currentPage);
      },
      error: () => {
        console.log('loading false');
      },
      complete: () => console.info('complete subject deletion'),
    });
  }
  ngOnDestroy() {
    this.subjectSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
