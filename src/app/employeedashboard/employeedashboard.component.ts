import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskTracker } from '../model/tasktracker';
import { EmployeeService } from '../service/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
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
  submitted: Boolean = false;
  success: boolean = false;
  fail: boolean = false;
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
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.reloadData();
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = new FormGroup({
      taskName: new FormControl('', [Validators.required]),
      additionalDetails: new FormControl('', [Validators.required]),
    });
  }

  reloadData() {
    this.employeeService.fetchAssignedTasks(this.empId).subscribe((data) => {
      this.storedTasks = data;
      console.log(data);
    });
    this.employeeService
      .fetchEmpById(this.empId)
      .subscribe((data) => (this.employee = data));
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.success = false;
      return;
    }
    this.newTask = Object.assign(this.newTask, this.form.value);
    this.newTask.employee = this.employee;
    console.log(this.newTask);
    this.employeeService
      .startNewTask(this.newTask)
      .subscribe((data) => console.log(data));
    this.reloadData();
  }

  endTask(task: TaskTracker) {
    this.employeeService.endTask(task).subscribe((data) => console.log(data));
    this.reloadData();
  }
  startTask(task: TaskTracker) {}
}
