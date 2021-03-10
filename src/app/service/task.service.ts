import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskTracker } from '../model/tasktracker';
const baseUrl = 'http://localhost:8293/';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  fetchAssignedTasks(empId: String): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl + 'employee/fetch-tasks/' + empId
    );
  }

  fetchTasksByDate(date: Date): Observable<TaskTracker[]> {
    return this.http.post<TaskTracker[]>(
      baseUrl + 'tasktracker/fetch-tasks-by-date/',
      date
    );
  }

  fetchTasksByEmpIdAndDate(
    empId: string,
    date: Date
  ): Observable<TaskTracker[]> {
    return this.http.post<TaskTracker[]>(
      baseUrl + 'tasktracker/search-emp-tasks-by-date/' + empId,
      date
    );
  }
}
