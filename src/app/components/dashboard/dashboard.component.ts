import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Variables
  userEmail: any = '';
  weatherData: any;


  // Functions
  constructor(public auth: AuthService, private userService: UserServiceService, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe(
      (data) => {
        this.weatherData = data
        console.log(this.weatherData.current);
      } 
    );

  }

  ngAfterViewInit(): void {

    // Getting User Email & Weather.
    setTimeout(() => {
      this.userEmail = this.getUserEmail();

    }, 1100);
  }


  
  private getUserEmail() {
    return document.querySelector('#userEmail')?.textContent;
  }
  
}
