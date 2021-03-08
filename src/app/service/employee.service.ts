import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { TaskTracker } from '../model/tasktracker';

const baseUrl = 'http://localhost:8293/';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  fetchAssignedTasks(empId: String): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl + 'employee/fetch-tasks/' + empId
    );
  }

  startNewTask(model): Observable<TaskTracker> {
    this.fetchEmpById(model.employee.empId).subscribe((data) =>
      console.log(data)
    );
    console.log(model.employee);
    return this.http.post<TaskTracker>(baseUrl + 'tasktracker/', model);
  }

  fetchEmpById(empId: String): Observable<Employee> {
    return this.http.get<Employee>(
      baseUrl + 'employee/fetch-employee/' + empId
    );
  }
}
