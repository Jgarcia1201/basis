import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL: string = "http://api.weatherapi.com/v1/current.json?key=8ec3a4d0dbc0412ebc4190012210408&q=string&aqi=yes";

  constructor(private http: HttpClient) { }

  public getWeather() {
    return this.http.get(this.weatherURL);
  }


}
