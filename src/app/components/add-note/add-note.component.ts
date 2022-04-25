import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  noteForm = this.formBuilder.group({
    title: '',
    content: ''
  });

  goalId: number = 0;
  note: Note = new Note;

  constructor(private noteService: NoteService, 
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    const goalId = +this.route.snapshot.paramMap.get('goalId')!;
    this.note!.title = this.noteForm.value.title;
    this.note!.content = this.noteForm.value.content;
    this.note!.goalId = goalId;

    this.noteService.addNote(this.note);

    this.router.navigate([`/goals/${goalId}`]);
  }

}
