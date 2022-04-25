import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Profile } from 'src/app/models/profile.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  model?: NgbDateStruct;
  date?: {year: number, month: number};
  userId: number = 0;

  constructor(private calendar: NgbCalendar, 
    private formBuilder: FormBuilder, 
    private taskService: TaskService, 
    private userService: UserServiceService,
    private http: HttpClient,
    private router: Router) { }

  taskForm = this.formBuilder.group({
    title: '',
    date: ''
  });

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Dealying DB Query - uses Value passed into div#email from Auth0. Auth0 Kinda sucks.
    setTimeout(() => {
      let email = document.querySelector('#userEmail')?.textContent!;

      // Getting DB Reference.
      this.userService.getDbUser(email).subscribe(
        (response: Profile) => {
          this.userId = response.id!;
        }
      );
    }, 1000);
  }

  // SUBMIT - ADD TASK 
  onSubmit(): void {

    let userDate = new Date(this.taskForm.value.date.year, this.taskForm.value.date.month - 1, this.taskForm.value.date.day);

    let requestObj = {
      "userId": this.userId,
      "title": this.taskForm.value.title,
      "dueDate": userDate,
    }

    this.http.post<any>("http://localhost:8080/api/tasks", {
      "userId": this.userId,
      "title": this.taskForm.value.title,
      "dueDate": userDate
    }).subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['/task']);  // Redirect to Task Page after submission.
        }
        else {
          console.log("ERROR NOT ADDED");
        }
      }
    );

    
  }

}
