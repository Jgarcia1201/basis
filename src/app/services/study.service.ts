import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  baseUrl: string = "http://localhost:8080/api/subject";

  constructor(private http: HttpClient) { }

  getSubjectsByUser(id: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/getbyuserid/${id}`);
  }

  addSubject(subject: Subject) {
    this.http.post(`${this.baseUrl}/add`, {
      "title": subject.title,
      "userId": subject.userId,
      "goalSec": subject.goalSec,
      "currentSec": subject.currentSec
    }).subscribe(
      (data) => {
        // do nothing.
      }
    )
  }

  updateSubject(id: number, subject: Subject) {
    this.http.put(`${this.baseUrl}/update/${id}`,
    {
      "title": subject.title,
      "goalSec": subject.goalSec,
      "userId": subject.userId,
      "currentSec": subject.currentSec
    }).subscribe(
      (data) => {
        // do nothing.
      }
    )
  }

  deleteSubject(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`).subscribe(
      (data) => {
        // do nothing.
      }
    )
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/getbyid/${id}`);
  }
}
