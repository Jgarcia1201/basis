import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import anime from 'animejs'
import { Subject } from 'src/app/models/subject.model';
import { StudyService } from 'src/app/services/study.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  interval: any;

  currentSubject: Subject = new Subject;

  constructor(private router: Router,
    private studyService: StudyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.handleDataTransfer();
  }

  ngAfterViewInit(): void {
    // Animation stuff.
    const grid = <HTMLScriptElement>document.querySelector('#timerGrid');
    for (let i = 0; i < 50; i++) {
      let cell = <HTMLDivElement>document.createElement('div');
      cell.className = "studyCell";
      cell.style.backgroundColor = "black";
      grid.appendChild(cell);
    }
    
  }

  handleDataTransfer(): void {
    const subjectId = +this.route.snapshot.paramMap.get('id')!;

    // Retreive Subject
    this.studyService.getSubjectById(subjectId).subscribe(
      (data) => {
        this.currentSubject = data;
      }
    );
  }

  startAnimation() {
    anime({
      targets: '#timerGrid .studyCell',
      translateX: anime.stagger(10, {grid: [10, 5], from: 'center', axis: 'x'}),
      translateY: anime.stagger(10, {grid: [10, 5], from: 'center', axis: 'y'}),
      rotateZ: anime.stagger([0, 200], {grid: [10, 5], from: 'center', axis: 'x'}),
      delay: anime.stagger(200, {grid: [10, 5], from: 'center'}),
      easing: 'easeInOutQuad',
      loop: true,
      direction: 'alternate',
      duration: 7000
    });

    this.interval = setInterval(() => {
      this.seconds++;
      if (this.seconds == 60) {
        this.minutes++
        this.seconds = 0;
        if (this.minutes == 60) {
          this.hours++;
          this.minutes = 0;
        }
      }
    }, 1000);
  }

  stopAnimation() {
    clearInterval(this.interval);
    const secondsStudied = this.handleTimeCalc();
    this.currentSubject.currentSec = this.currentSubject.currentSec! + secondsStudied;
    this.studyService.updateSubject(this.currentSubject.id!, this.currentSubject);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  cancelButtonClick() {
    this.stopAnimation();
    this.router.navigate([`/study`]);
  }

  handleTimeCalc() {
    return ((this.hours * 60) * 60) + (this.minutes * 60) + this.seconds;
  }

}
