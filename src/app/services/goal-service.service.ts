import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalServiceService {

  baseUrl: string = "http://localhost:8080/api/goals";

  constructor(private http: HttpClient) { }

  getGoalsByUser(id: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.baseUrl}/${id}`);
  }

  getGoalsById(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.baseUrl}/byid/${id}`);
  }

  addGoal(goal: Goal) {
    this.http.post(`${this.baseUrl}/add`, {
      "title": goal.title,
      "userId": goal.userId
    }).subscribe(
      (data) => {
        if (data) {
          console.log("Saved");
        }
      }
    )
  }

  updateGoal(id: number, goal: Goal): void {
    this.http.put(`${this.baseUrl}/update/${id}`, {
    'title': goal.title,
    'userId': goal.userId
    }).subscribe(
      (data) => {
        if (data) {
          console.log("ERROR NOT SAVED");
        }
        else {
          console.log("HELLO")
        }
      }
    );

  }


  
}
