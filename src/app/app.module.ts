import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { GoalsComponent } from './components/goals/goals.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { EditGoalComponent } from './components/edit-goal/edit-goal.component';
import { StudyComponent } from './components/study/study.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { TimerComponent } from './components/timer/timer.component';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    DashboardComponent,
    TaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    GoalsComponent,
    NoteListComponent,
    EditNoteComponent,
    AddNoteComponent,
    AddGoalComponent,
    EditGoalComponent,
    StudyComponent,
    AddSubjectComponent,
    TimerComponent,
    EditSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // TODO: Use ENV variables to shield this from super hackers.
    AuthModule.forRoot({
      domain: 'dev-egv13wmn.us.auth0.com',
      clientId: 'J4WWCSZ6GaENsJm248DyZQo8cFHTcMwK'
    }),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
