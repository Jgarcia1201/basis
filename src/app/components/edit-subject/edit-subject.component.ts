import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { StudyService } from 'src/app/services/study.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

    hours: number = 1;

    currentSubject: Subject = new Subject;
    // FormBuilder 
    subjectForm = this.formBuilder.group({
      goalSec: 0,
      title: ''
    });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private studyService: StudyService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.handleDataTransfer();
  }

  onSubmit() {
    this.currentSubject.title = this.subjectForm.value.title;
    this.currentSubject.goalSec = (this.hours * 60) * 60;
    this.studyService.updateSubject(this.currentSubject.id!, this.currentSubject);
    this.router.navigate([`/study`]);
  }

  deleteSubject() {
    this.studyService.deleteSubject(this.currentSubject.id!);
    this.router.navigate([`/study`]);
  }

  handleDataTransfer(): void {
    const subjectId = +this.route.snapshot.paramMap.get('id')!;

    // Retreive Subject
    this.studyService.getSubjectById(subjectId).subscribe(
      (data) => {
        this.currentSubject = data;
        this.hours = (this.currentSubject.goalSec! / 60) / 60;
      }
    );
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
