import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { Profile } from 'src/app/models/profile.model';
import { GoalServiceService } from 'src/app/services/goal-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  userEmail: string = '';
  userProfile = new Profile;

  goals: Goal[] = [];

  constructor(private userService: UserServiceService, private goalService: GoalServiceService, private router: Router) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.userEmail = this.getUserEmail()!;

      // Getting DB Reference.
      this.userService.getDbUser(this.userEmail).subscribe(
        (data: Profile) => {
          this.userProfile = data;
        }
      );
    }, 1000);

    // Getting Goals By User
    setTimeout(() => {
      this.goalService.getGoalsByUser(this.userProfile.id!).subscribe(
        (data: Goal[]) => {
          this.goals = data;
          console.log(this.goals);
        }
      );
    }, 1100);

    // Fading in Because Ugly
    setTimeout(() => {
      let goalGrid = document.querySelector<HTMLElement>('#goalGrid');
      goalGrid!.style.opacity = "1";
    }, 1300);


  }


  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }

}
