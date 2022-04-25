import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { Subject } from 'src/app/models/subject.model';
import { StudyService } from 'src/app/services/study.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  userProfile: Profile = new Profile;
  hours: number = 1;

  subject: Subject = new Subject;

  // FormBuilder 
  subjectForm = this.formBuilder.group({
    userId: 0,
    goalSec: 0,
    currentSec: 0,
    title: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private studyService: StudyService
  ) { }

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
          console.log(this.userProfile);
        }
      )
    }, 1000);
  }

  onSubmit() {

    const hoursToSeconds = (this.hours * 60) * 60;
    this.subject.title = this.subjectForm.value.title;
    this.subject.userId = this.userProfile.id;
    this.subject.goalSec = hoursToSeconds;
    this.subject.currentSec = 0;

    this.studyService.addSubject(this.subject);
    this.router.navigate([`/study`]);
  }

  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }

  // Incrementing:
  addHour(): void {
    if(this.hours < 6) {
      this.hours++;
    }
  }

  minHour(): void {
    if (this.hours > 1) {
      this.hours--;
    }
  }

}
