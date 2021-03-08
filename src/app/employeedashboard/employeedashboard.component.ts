import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskTracker } from '../model/tasktracker';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css'],
})
export class EmployeedashboardComponent implements OnInit {
  storedTasks: TaskTracker[];
  model: any = {};
  today: number = Date.now();
  tasks: string[] = ['Online Training', 'Meeting', 'Travelling', 'Interview'];
  empId: string = String(localStorage.getItem('empId'));
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.fetchAssignedTasks(this.empId).subscribe((data) => {
      this.storedTasks = data;
      console.log(this.storedTasks);
    });
  }

  onSubmit() {
    this.model.employee.empId = this.empId;
    this.employeeService
      .startNewTask(this.model)
      .subscribe((data) => console.log());
  }
  endTask(task: TaskTracker) {}
  startTask(task: TaskTracker) {}
}
