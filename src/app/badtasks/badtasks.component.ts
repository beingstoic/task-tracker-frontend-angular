import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DisplayModel } from '../model/model';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-badtasks',
  templateUrl: './badtasks.component.html',
  styleUrls: ['./badtasks.component.css'],
})
export class BadtasksComponent implements OnInit {
  today: Date = new Date(Date.now());
  form: FormGroup;
  taskForm: FormGroup;
  yesterday: Date = new Date();
  display: DisplayModel;
  resultsDate: Date = this.yesterday;
  displayObject: DisplayModel[] = new Array();
  constructor(
    private router: Router,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populate();
  }

  populate() {
    this.yesterday.setDate(this.today.getDate() - 1);
    this.fetchBadTasksByDate(this.yesterday);
  }

  createForm() {
    this.form = new FormGroup({
      taskDate: new FormControl(),
    });

    this.taskForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }

  errorHandler(err) {
    if (err.error.message != null)
      this.toastr.error('Error', err.error.message);
    else
      this.toastr.error('Error', 'Request Timed out, Please try again later');
  }

  fetchBadTasksByDate(date: Date) {
    this.taskService.fetchBadTasksByDate(date).subscribe(
      (data) => {
        this.displayObject = data;
        this.resultsDate = date;
        console.log(data);
      },
      (err) => this.errorHandler(err)
    );
  }

  onSubmit() {
    let date = new Date(this.form.value.taskDate);
    console.log(date);
    this.fetchBadTasksByDate(date);
  }
}
