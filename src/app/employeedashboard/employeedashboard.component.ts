import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskTracker } from '../model/tasktracker';
import { EmployeeService } from '../service/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css'],
})
export class EmployeedashboardComponent implements OnInit {
  storedTasks: TaskTracker[];
  model: any = {};
  form: FormGroup;
  newTask: TaskTracker = new TaskTracker();
  today: number = Date.now();

  tasks: string[] = [
    'Online Training',
    'Meeting',
    'Travelling',
    'Interview',
    'Break',
    'Sample task',
  ];
  empId: string = String(localStorage.getItem('empId'));
  employee: Employee = new Employee();

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createForm();
    this.reloadData();
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = new FormGroup({
      taskName: new FormControl('', [Validators.required]),
      additionalDetails: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  reloadData() {
    this.taskService.fetchTasksByEmpIdAndDate(this.empId, new Date()).subscribe(
      (data) => {
        this.storedTasks = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.fetchEmployee();
      }
    );
  }
  errorHandler(err) {
    if (err.error.message != null)
      this.toastr.error('Error', err.error.message);
    else
      this.toastr.error('Error', 'Request Timed out, Please try again later');
  }
  fetchEmployee() {
    this.employeeService.fetchEmpById(this.empId).subscribe(
      (data) => (this.employee = data),
      (err) => this.errorHandler(err)
    );
  }

  onSubmit() {
    this.newTask = Object.assign(this.newTask, this.form.value);
    this.newTask.employee = this.employee;
    this.employeeService.startNewTask(this.newTask).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Task added Successfully');
      },
      (err) => this.errorHandler(err),
      () => this.reloadData()
    );
  }

  endTask(task: TaskTracker) {
    this.employeeService.endTask(task).subscribe(
      (data) =>
        this.toastr.success(
          "Great Job, You've successfully completed the task."
        ),
      (err) => this.errorHandler(err),
      () => this.reloadData()
    );
  }
  startTask(task: TaskTracker) {}

  logout() {
    this.router.navigate(['./login']);
    localStorage.removeItem('empId');
    localStorage.removeItem('token');
  }
}
