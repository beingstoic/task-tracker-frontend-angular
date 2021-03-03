import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  checkadminlogin(login:login){
    console.log(login);
    return this.http.post("http://localhost:8293/admin/login", login);
  }
  checkemplogin(login:login){
    console.log(login);
    return this.http.post(`http://localhost:8293/employee/login`, login);
  }

}
