import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { FormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  model?: NgbDateStruct;
  date?: {year: number, month: number};

  currentTask?: Task = new Task;

  taskForm = this.formBuilder.group({
    title: '',
    date: ''
  });

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      () => {
        this.handleTaskDetails();
      }
    )
  }

  handleTaskDetails() {
    const taskId: number = +this.route.snapshot.paramMap.get('id')!;

    this.taskService.getTaskById(taskId).subscribe(
      (data) => {
        this.currentTask = data;
      }
    )
  }

  onSubmit() {
    let userDate = new Date(this.taskForm.value.date.year, this.taskForm.value.date.month, this.taskForm.value.date.day);
    this.currentTask!.title = this.taskForm.value.title;
    this.currentTask!.dueDate = userDate;

    this.taskService.updateTask(this.currentTask?.id!, this.currentTask!);

    this.router.navigate(['/task']);
    
  }

}
