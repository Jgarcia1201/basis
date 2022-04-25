import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  currentNote: Note = new Note;
  goalId: number = 0;

  noteForm = this.formBuilder.group({
    title: '',
    content: ''
  })

  constructor(private noteService: NoteService, 
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.handleDataTransfer();
  }

  private handleDataTransfer(): void {

    // Extract Parameters from URL
    const id = +this.route.snapshot.paramMap.get('noteId')!;
    this.goalId = +this.route.snapshot.paramMap.get('goalId')!;
    
    // Retrieve Current Note
    this.noteService.getNoteById(id).subscribe(
      (data: Note) => {
        this.currentNote = data;
        this.noteForm.get('content')?.setValue(this.currentNote.content);
      }
    );
  }

  onSubmit() {
    this.currentNote!.title = this.noteForm.value.title;
    this.currentNote.content = this.noteForm.value.content;

    this.noteService.updateNote(this.currentNote.id!, this.currentNote);

    this.router.navigate([`/goals/${this.goalId}`]);
  }

  deleteNote() {
    const id = +this.route.snapshot.paramMap.get('noteId')!;
    this.noteService.deleteNote(id);
    // Lazy Loading Workaround
    setTimeout(() => {
      this.router.navigate([`/goals/${this.goalId}`]);
      window.location.reload();
    }, 1000);
  }

}
