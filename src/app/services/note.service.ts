import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl: string = "http://localhost:8080/api/notes";

  constructor(private http: HttpClient, private router: Router) { }

  getNotesByGoal(goalId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.baseUrl}/${goalId}`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/deets/${id}`);
  }

  addNote(note: Note) {
    this.http.post<any>(`${this.baseUrl}/add`, {
      'title': note.title,
      'content': note.content,
      'goalId': note.goalId
    }).subscribe(
      (data) => {
        if (data) {
          console.log("saved");
        }
        else {
          console.log("not saved");
        }
      }
    )
  }

  updateNote(id: number, note: Note): void {
    this.http.put(`${this.baseUrl}/edit/${id}`, {
      "id": id,
      "title": note.title,
      "content": note.content,
      "goalId": note.goalId
    }).subscribe(
      (data) => {
        if (data) {
          console.log("ERROR NOT SAVED");
        }
        else {
          // do nothing.
        }
      }
    )
  }

  deleteNote(id: number) {
    this.http.delete<any>(`${this.baseUrl}/delete/${id}`).subscribe(
      (data) => {
        console.log("Deleted");
      }
    )
  }


}
