import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sub } from '../sub.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css'],
})
export class SubjectCreateComponent implements OnInit, OnDestroy {
  subject: Sub;
  subjectAadhar = '';
  subjectName = '';

  editMode = false;
  private subjectId: string;
  form: FormGroup;
  private authStatusSub: Subscription;

  constructor(
    private subjectService: SubjectService,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        // this.isLoading=false;
        console.log('isLoading false');
      });

    this.form = new FormGroup({
      subjectAadhar: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      subjectName: new FormControl(null, { validators: [Validators.required] }),
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('subjectId')) {
        this.editMode = true;
        this.subjectId = paramMap.get('subjectId');
        this.subjectService
          .getSubject(this.subjectId)
          .subscribe((subjectData) => {
            console.log(subjectData);
            const transformedSubjectData: Sub = {
              _id: subjectData._id,
              subjectAadhar: subjectData.subjectAadhar,
              subjectName: subjectData.subjectName,
              creator: subjectData.creator,
            };
            this.subject = transformedSubjectData;
            this.form.setValue({
              subjectAadhar: this.subject.subjectAadhar,
              subjectName: this.subject.subjectName,
            });
            console.log(this.subject);
          });
      } else {
        this.editMode = false;
        this.subjectId = null;
      }
    });
  }

  onSaveSubject() {
    if (this.form.invalid) {
      return;
    }
    if (!this.editMode) {
      console.log('calling add subject');
      this.subjectService.addSubject(
        this.form.value.subjectAadhar,
        this.form.value.subjectName
      );
    } else {
      console.log('calling UPDATE subject');
      this.subjectService.updateSubject(
        this.subjectId,
        this.form.value.subjectAadhar,
        this.form.value.subjectName
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
