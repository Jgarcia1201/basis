import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private authUrl: string = 'https://dev-egv13wmn.us.auth0.com/userinfo';
  private baseUrl: string = "http://localhost:8080/api/user"

  public profile: Profile = new Profile;

  constructor(public auth: AuthService, private http: HttpClient) { }

  getDbUser(email: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/${email}`);
  }

}
