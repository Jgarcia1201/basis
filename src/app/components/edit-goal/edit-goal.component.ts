import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { GoalServiceService } from 'src/app/services/goal-service.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent implements OnInit {

  currentGoal: Goal = new Goal;

  // Form Builder:
  goalForm = this.formBuilder.group({
    title: ''
  });

  constructor(
    private goalService: GoalServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) {

     }

  ngOnInit(): void {
    this.handleDataTransfer();
  }

  private handleDataTransfer(): void {
    // Get Id From URL.
    const goalId: number = +this.route.snapshot.paramMap.get('id')!;

    // Retreive Goal
    this.goalService.getGoalsById(goalId).subscribe(
      (data) => {
        this.currentGoal = data;
      }
    );
  }

  onSubmit() {
    // Get Goal Id From Url
    const goalId: number = +this.route.snapshot.paramMap.get('id')!;

    // Stage Data
    // You got caught up on this. REMEBER TO STAGE YOUR DATA!!!!!!
    this.currentGoal.title = this.goalForm.value.title;

    // Update w/ Service
    this.goalService.updateGoal(goalId, this.currentGoal);

    // Redirect
    this.router.navigate([`/goals`]);
  }

}
