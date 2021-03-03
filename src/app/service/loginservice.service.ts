import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../model/login';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'http://localhost:8293/';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }



  checkEmpLogin(login): Observable<any> {
    return this.http.post(AUTH_API + 'employee/login', login, httpOptions);
  }

  checkAdminLogin(login): Observable<any> {
    return this.http.post(AUTH_API + 'admin/login', login, httpOptions);
  }

}
