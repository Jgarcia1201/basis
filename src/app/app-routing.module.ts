import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { GoalsComponent } from './components/goals/goals.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { EditGoalComponent } from './components/edit-goal/edit-goal.component';
import { StudyComponent } from './components/study/study.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  {path: 'task/:id', component: EditTaskComponent, canActivate: [AuthGuard]},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {path: "task", component: TaskComponent, canActivate: [AuthGuard]},
  {path: "addtask", component: AddTaskComponent, canActivate: [AuthGuard]},
  {path: "goals", component: GoalsComponent, canActivate: [AuthGuard]},
  {path: "goals/:id", component: NoteListComponent, canActivate: [AuthGuard]},
  {path: "goals/add/newgoal", component: AddGoalComponent, canActivate: [AuthGuard]},
  {path: "goals/edit/:id", component: EditGoalComponent, canActivate: [AuthGuard]},
  {path: "goals/:goalId/notes/:noteId", component: EditNoteComponent, canActivate: [AuthGuard]},
  {path: "goals/:goalId/addnote", component: AddNoteComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: "study", component: StudyComponent, canActivate: [AuthGuard]},
  {path: "study/add", component: AddSubjectComponent, canActivate: [AuthGuard]},
  {path: "study/edit/:id", component: EditSubjectComponent, canActivate: [AuthGuard]},
  {path: "study/timer/:id", component: TimerComponent, canActivate: [AuthGuard]},
  {path: "", pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
