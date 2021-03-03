import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin } from '../model/admin';
import { employee } from '../model/employee';
import { login } from '../model/login';
import { LoginserviceService } from '../service/loginservice.service';
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  login: login;
  inputType="password"
  admin:admin;
  employee:employee;
  role: any=['ADMIN','EMPLOYEE']
  

  constructor(private router: Router,
    private loginservice: LoginserviceService,public fb: FormBuilder) { }

     /*########### Form ###########*/
  registrationForm = this.fb.group({
    roleName: ['']
  })

  changeCity(e) {
    this.role.setValue(e.target.value, {
      onlySelf: true
    })
  }

    ngOnInit() {
      this.login = new login();
      
    }

    onSubmit(){
      if(this.login.role=="ADMIN"){
      this.loginservice.checkadminlogin(this.login).subscribe((r : admin) => {
        this.admin= r;
        console.log(admin);
        this.router.navigate(['../admindashboard/']);
        
      },err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) { 
            
            window.alert("Credentials Are Wrong");
          }
        }
      })
    }//first if

     if(this.login.role=="EMPLOYEE"){
      this.loginservice.checkemplogin(this.login).subscribe((r : employee) => {
        this.employee= r;
        console.log(employee);
        this.router.navigate(['../employeedashboard']);
        
      },err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) { 
            
            window.alert("Credentials Are Wrong");
          }
        }
      })
    }//second if
     
    }
    toggle() {
      if (this.inputType == "password")
        this.inputType = "text"
      else
        this.inputType = "password"
    }

}