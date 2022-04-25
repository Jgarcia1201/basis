import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { Subject } from 'src/app/models/subject.model';
import { StudyService } from 'src/app/services/study.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  userEmail: string = '';
  userProfile: Profile = new Profile;

  subjects: Subject[] = [];

  constructor(private userService: UserServiceService,
              private router: Router,
              private studyService: StudyService) { }

  ngOnInit(): void {

    // Getting User From DB.
    setTimeout(() => {
      this.userEmail = this.getUserEmail()!;

      this.userService.getDbUser(this.userEmail).subscribe(
        (data) => {
          this.userProfile = data;
        }
      );
    }, 1000);

    // Getting Subjects By User
    setTimeout(() => {
      this.studyService.getSubjectsByUser(this.userProfile.id!).subscribe(
        (data) => {
          this.subjects = data;
        }
      );
    }, 1100);

    // Fading In
    setTimeout(() => {
      let grid = <HTMLScriptElement>document.querySelector('#studyGrid');
      grid!.style.opacity = "1";
    }, 1200);
  }

  ngAfterViewInit(): void {


  }

  getCalc(subject: Subject) {
    return Math.floor((subject.currentSec! / subject.goalSec!) * 100);
  }

  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }

}
