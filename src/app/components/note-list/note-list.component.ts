import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal } from 'src/app/models/goal.model';
import { Note } from 'src/app/models/note.model';
import { GoalServiceService } from 'src/app/services/goal-service.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = [];

  goal: Goal = new Goal;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private goalService: GoalServiceService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      () => {
        this.handleGoalDetails();
      }
    );


  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      let goalGrid = document.querySelector<HTMLElement>('#noteListGrid');
      goalGrid!.style.opacity = "1";
    }, 1000);
  }

  handleGoalDetails() {
    const goalId: number = +this.route.snapshot.paramMap.get('id')!;

    this.noteService.getNotesByGoal(goalId).subscribe(
      (data: Note[]) => {
        this.notes = data;
        console.log(data);
      }
    );

    this.goalService.getGoalsById(goalId).subscribe(
      (data: Goal) => {
        this.goal = data;
      }
    );

  }

}
