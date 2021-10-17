import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

@NgModule({
  declarations: [SubjectListComponent, SubjectCreateComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SubjectsModule {}
