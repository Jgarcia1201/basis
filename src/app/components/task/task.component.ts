import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Profile } from 'src/app/models/profile.model';
import { TaskService } from 'src/app/services/task.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  // Variables
  userProfile: Profile = new Profile;
  userEmail: any = '';
  userId: number = 0;

  tasks: Task[] = [];

  constructor(public auth: AuthService, private userService: UserServiceService, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    // Dealying DB Query - uses Value passed into div#email from Auth0.
    setTimeout(() => {
      this.userEmail = this.getUserEmail();

      // Getting DB Reference.
      this.userService.getDbUser(this.userEmail).subscribe(
        (data: Profile) => {
          this.userProfile = data;
        }
      );
    }, 1000);


    // Getting Task After User Retrival From DB.
    setTimeout(() => {
      this.taskService.getTasksByUser(this.userProfile.id!).subscribe(
        (data: Task[]) => {
          this.tasks = data;
        }
      );
    }, 1100);

    // Fading in because the other way is ugly.
    setTimeout(() => {
      let taskGrid = document.querySelector<HTMLElement>('#taskGrid');
      taskGrid!.style.opacity = "1";
    }, 1300);


  }

  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }

  finishTask(temp: Task) {
    this.taskService.finishTask(temp);
  }

}
