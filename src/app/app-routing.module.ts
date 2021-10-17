import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SubjectCreateComponent } from './subjects/subject-create/subject-create.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';

const routes: Routes = [
  { path: '', component: SubjectListComponent },
  { path: 'create', component: SubjectCreateComponent, canActivate:[AuthGuard] },
  { path: 'edit/:subjectId', component: SubjectCreateComponent , canActivate:[AuthGuard]},
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
  // {path:'auth', loadChildren: "./auth/auth.module#AuthModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
