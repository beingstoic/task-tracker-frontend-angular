import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { BadtasksComponent } from './badtasks/badtasks.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employeedashboard',
    component: EmployeedashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'badtasks',
    component: BadtasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
