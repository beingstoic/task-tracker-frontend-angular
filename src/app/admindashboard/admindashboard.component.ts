import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskTracker } from '../model/tasktracker';
import { EmployeeService } from '../service/employee.service';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  taskNames: string[] = [
    'Online Training',
    'Meeting',
    'Travelling',
    'Interview',
    'Break',
    'Sample task',
  ];
  fetchedTasks: TaskTracker[];
  form: FormGroup;
  today: Date = new Date(Date.now());
  yesterday: Date = new Date();
  resultsDate: Date = this.yesterday;
  formObject = {
    startDate: new Date(),
    taskName: '',
    empId: '',
  };

  adminId: string = String(localStorage.getItem('adminId'));
  constructor(
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populate();
  }

  get f() {
    return this.form.controls;
  }

  errorHandler(err) {
    if (err.error.message != null)
      this.toastr.error('Error', err.error.message);
    else
      this.toastr.error('Error', 'Request Timed out, Please try again later');
  }

  populate() {
    this.yesterday.setDate(this.today.getDate() - 1);
    this.fetchTasksByDate(this.yesterday);
  }

  durationConvertor(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }

  createForm() {
    this.form = new FormGroup({
      startDate: new FormControl(''),
      taskName: new FormControl(''),
      empId: new FormControl(''),
    });
  }
  onSubmit() {
    Object.assign(this.formObject, this.form.value);
    // console.log(this.formObject);

    if (
      this.formObject.startDate != null &&
      this.formObject.empId === '' &&
      this.formObject.taskName === ''
    ) {
      console.log(this.formObject);
      this.fetchTasksByDate(new Date(this.formObject.startDate));
    } else if (
      this.formObject.startDate != null &&
      this.formObject.empId != '' &&
      this.formObject.taskName === ''
    ) {
      this.fetchTasksByEmpIdAndDate(
        this.formObject.empId,
        new Date(this.formObject.startDate)
      );
    }

    if (
      this.formObject.empId != null &&
      this.formObject.startDate != null &&
      this.formObject.empId != null
    ) {
    }
  }

  // These functions are getting used for service calls in the backend

  fetchTasksByDate(date: Date) {
    this.taskService.fetchTasksByDate(date).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.resultsDate = date;
      },
      (err) => this.errorHandler(err)
    );
  }

  fetchTasksByEmpIdAndDate(empId: string, date: Date) {
    console.log(date, empId);
    this.taskService.fetchTasksByEmpIdAndDate(empId, date).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.resultsDate = date;
      },
      (err) => this.errorHandler(err)
    );
  }
}
