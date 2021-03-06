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

  startNewTask(task: TaskTracker) {
    return this.http.post<TaskTracker>(baseUrl + 'tasktracker/', task);
  }
}
