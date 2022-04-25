import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string = "http://localhost:8080/api/tasks";

  constructor(private http: HttpClient, private router: Router) { }

  getTasksByUser(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${id}`)
  }

  finishTask(temp: Task): void {
    this.http.delete<any>(`http://localhost:8080/api/tasks/${temp.id}`).
    subscribe(
      (data) => {
        console.log("Deleted");
        window.location.reload();
      }
    )
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:8080/api/tasks/edit/${id}`);
  }


  updateTask(id: number, task: Task): void {
    this.http.put<any>(`http://localhost:8080/api/tasks/edit/${id}`, {
      "id": id,
      "userId": task.userId,
      "title": task.title,
      "dueDate": task.dueDate
    }).subscribe(
      (data) => {
        if (data) {
          console.log("ERROR NOT SAVED");
        }
        else {
          // do nothing.
        }
      }
    );

  }
}
