import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../model/admin';
import { Employee } from '../model/employee';
import { login } from '../model/login';
import { LoginserviceService } from '../service/loginservice.service';
import { FormBuilder, Validators } from '@angular/forms';
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
    public fb: FormBuilder
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
        localStorage.setItem('empId', data.adminId);
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
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        window.alert('Invalid username or password');
      } else if (err.status === 400) {
        window.alert('Invalid request');
      } else {
        window.alert("Its not you, It's us. Please try again later");
      }
    }
  }
}
