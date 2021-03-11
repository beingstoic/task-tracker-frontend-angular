import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DisplayModel } from '../model/model';
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
  display: DisplayModel;
  displayObject: DisplayModel[] = new Array();
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

  sortFetchedTasks() {
    let length = 0;
    let firstFlag = 0;
    this.displayObject = [];
    console.log(this.displayObject.length);
    this.fetchedTasks.map((task) => {
      let flag = 0;

      for (let i = 0; i <= length; i++) {
        if (this.displayObject.length === 0) {
          this.displayObject.push(this.newDisplayObject(task));
          flag = 1;
        } else if (length !== 0 || firstFlag === 1) {
          if (task.employee.empId === this.displayObject[i].empId) {
            this.displayObject[i].totalDuration += task.duration;
            this.displayObject[i].tasks.push(task);
            flag = 1;
          }
        }
      }
      if (flag === 0) {
        this.displayObject.push(this.newDisplayObject(task));
        length = length + 1;
        console.log('hii ', length);
      }
      if (this.displayObject.length === 1) {
        firstFlag = 1;
      }
      flag = 0;
    });

    console.log(this.displayObject);
  }

  newDisplayObject(task: TaskTracker) {
    let display = new DisplayModel();
    display.empId = task.employee.empId;
    display.name = task.employee.name;
    display.totalDuration += task.duration;
    display.tasks.push(task);

    return display;
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

  createForm() {
    this.form = new FormGroup({
      startDate: new FormControl(''),
      taskName: new FormControl(''),
      empId: new FormControl(''),
    });
  }
  onSubmit() {
    Object.assign(this.formObject, this.form.value);
    console.log(this.formObject.startDate);

    //start date is not null, rest are null
    if (
      this.formObject.startDate &&
      this.formObject.empId === '' &&
      this.formObject.taskName === ''
    ) {
      this.fetchTasksByDate(new Date(this.formObject.startDate));
    }

    //startdate and employee id is not null
    else if (
      this.formObject.startDate &&
      this.formObject.empId != '' &&
      this.formObject.taskName === ''
    )
      this.fetchTasksByEmpIdAndDate(
        this.formObject.empId,
        new Date(this.formObject.startDate)
      );
    //only employee id is present
    else if (
      !this.formObject.startDate &&
      this.formObject.empId != '' &&
      this.formObject.taskName === ''
    )
      this.fetchTasksByEmpId(this.formObject.empId);
    //only taskName is not null
    else if (
      !this.formObject.startDate &&
      this.formObject.empId === '' &&
      this.formObject.taskName != ''
    )
      this.fetchTasksByTaskName(this.formObject.taskName);
    //start date and taskname are not null
    else if (
      this.formObject.startDate &&
      this.formObject.empId === '' &&
      this.formObject.taskName != ''
    )
      this.fetchTasksByDateAndName(
        this.formObject.startDate,
        this.formObject.taskName
      );
    //only startdate is null
    else if (
      !this.formObject.startDate &&
      this.formObject.empId != '' &&
      this.formObject.taskName != ''
    )
      this.fetchTasksByEmpIdAndName(
        this.formObject.empId,
        this.formObject.taskName
      );
    //All fields are present
    else if (
      this.formObject.startDate &&
      this.formObject.empId != '' &&
      this.formObject.taskName != ''
    )
      this.fetchTasksByEmpIdDateAndName(
        this.formObject.empId,
        this.formObject.startDate,
        this.formObject.taskName
      );
    else this.toastr.info('Oops!', 'Search bar is empty');
  }

  // These functions are getting used for service calls in the backend

  fetchTasksByDate(date: Date) {
    this.taskService.fetchTasksByDate(date).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.resultsDate = date;
        this.sortFetchedTasks();
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
        this.sortFetchedTasks();
      },
      (err) => this.errorHandler(err)
    );
  }

  fetchTasksByEmpId(empId: string) {
    this.taskService.fetchAssignedTasks(empId).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.sortFetchedTasks();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchTasksByTaskName(taskName: string) {
    this.taskService.fetchByTaskName(taskName).subscribe(
      (data) => {
        console.log(data);
        this.fetchedTasks = data;
        this.sortFetchedTasks();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchTasksByDateAndName(startDate: Date, taskName: string) {
    this.taskService.fetchTasksByDateAndName(startDate, taskName).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.resultsDate = startDate;
        this.sortFetchedTasks();
      },
      (err) => this.errorHandler(err)
    );
  }

  fetchTasksByEmpIdAndName(empId: string, taskName: string) {
    this.taskService.fetchTasksByEmpIdAndName(empId, taskName).subscribe(
      (data) => {
        this.fetchedTasks = data;
        this.sortFetchedTasks();
      },
      (err) => this.errorHandler(err)
    );
  }

  fetchTasksByEmpIdDateAndName(
    empId: string,
    startDate: Date,
    taskName: string
  ) {
    this.taskService
      .fetchTasksByEmpIdDateAndName(empId, startDate, taskName)
      .subscribe(
        (data) => {
          this.fetchedTasks = data;
          this.resultsDate = startDate;
          this.sortFetchedTasks();
        },
        (err) => this.errorHandler(err)
      );
  }
}
