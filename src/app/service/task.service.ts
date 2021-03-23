import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskTracker } from '../model/tasktracker';
import { DisplayModel } from '../model/model';
const baseUrl = 'http://localhost:8293/';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  datepipe: any;
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

  fetchByTaskName(taskName: String): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl + 'tasktracker/fetch-tasks-by-name/' + taskName
    );
  }

  fetchTasksByDateAndName(
    date: Date,
    taskName: string
  ): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl + 'tasktracker/fetch-by-name-and-date/' + taskName + '/' + date
    );
  }

  fetchTasksByEmpIdAndName(
    empId: string,
    taskName: string
  ): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl + 'tasktracker/fetch-by-empid-and-name/' + empId + '/' + taskName
    );
  }

  fetchTasksByEmpIdDateAndName(
    empId: string,
    date: Date,
    taskName: string
  ): Observable<TaskTracker[]> {
    return this.http.get<TaskTracker[]>(
      baseUrl +
        'tasktracker/fetch-by-empid-name-and-date/' +
        empId +
        '/' +
        date +
        '/' +
        taskName
    );
  }

  fetchBadTasksByDate(date: Date): Observable<DisplayModel[]> {
    console.log(date);
    return this.http.post<DisplayModel[]>(
      baseUrl + 'tasktracker/fetch-bad-tasks-by-date/',
      date
    );
  }

  fetchBademployeeByDate(
    startdate: Date,
    enddate: Date
  ): Observable<DisplayModel[]> {
    let startdate1 = this.datepipe.transform(startdate, 'yyyy-MM-dd');
    let enddate1 = this.datepipe.transform(enddate, 'yyyy-MM-dd');
    console.log(startdate, enddate);
    return this.http.get<DisplayModel[]>(
      baseUrl +
        'tasktracker/fetch-bad-employees-by-date/' +
        startdate1 +
        '/' +
        enddate1
    );
  }
}
