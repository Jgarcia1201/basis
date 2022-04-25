import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { Profile } from 'src/app/models/profile.model';
import { GoalServiceService } from 'src/app/services/goal-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  userProfile: Profile = new Profile;

  goal: Goal = new Goal;

  // Form Builder
  goalForm = this.formBuilder.group({
    title: ''
  })

  constructor(
    private goalService: GoalServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService) {

     }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Delaying DB Query
    setTimeout(() => {
      this.userProfile.email = this.getUserEmail()!;
      // Getting User
      this.userService.getDbUser(this.userProfile.email).subscribe(
        (data) => {
          this.userProfile = data;
        }
      )
    }, 1000);
  }

  onSubmit() {
    this.goal.title = this.goalForm.value.title;
    this.goal.userId = this.userProfile.id;
    this.goalService.addGoal(this.goal);
    this.router.navigate([`/goals`]);
  }

  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }

}
