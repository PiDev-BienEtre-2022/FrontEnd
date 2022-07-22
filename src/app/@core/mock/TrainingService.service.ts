import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from '../../entities/training';
import { TrainingData } from '../data/TrainingData';

@Injectable()
export class TrainingService extends TrainingData {

  private trainingUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.trainingUrl = 'http://localhost:8084/api/training';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4NDc1Njk3LCJleHAiOjE2NTg1NjIwOTd9.5W74eUFJmLpSbheFgMo4E-U_qShHfy_sYYDEwatWcPo_gXBc8OS4PJMNW5ML3So5kcfi3JqC4mtCDRaWUOUeAA`
  })
  

  getData():  Observable<Training[]> {
    //return this.data;
    return  this.http.get<Training[]>(this.trainingUrl+"/list", {headers: this.headers} );
  }


}
