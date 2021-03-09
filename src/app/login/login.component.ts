import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { Employee } from '../model/employee';
import { login } from '../model/login';
import { LoginserviceService } from '../service/loginservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: login;
  inputType = 'password';
  admin: Admin;
  employee: Employee;
  roles: string[] = ['ADMIN', 'EMPLOYEE'];

  constructor(
    private router: Router,
    private loginservice: LoginserviceService,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.login = new login();
  }

  onSubmit() {
    if (this.login.role == 'ADMIN') {
      this.loginAdmin();
    }

    if (this.login.role == 'EMPLOYEE') {
      this.loginEmployee();
    }
  }
  toggle() {
    if (this.inputType == 'password') this.inputType = 'text';
    else this.inputType = 'password';
  }
  loginAdmin() {
    this.loginservice.checkAdminLogin(this.login).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('adminId', data.adminId);
        this.router.navigate(['../admindashboard/']);
      },
      (err) => this.errorHandler(err)
    );
  }
  loginEmployee() {
    this.loginservice.checkEmpLogin(this.login).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('empId', data.empId);
        this.router.navigate(['../employeedashboard']);
      },
      (err) => this.errorHandler(err)
    );
  }

  errorHandler(err) {
    if (err.error.message != null)
      this.toastr.error('Error', err.error.message);
    else
      this.toastr.error('Error', 'Request Timed out, Please try again later');
  }
}
