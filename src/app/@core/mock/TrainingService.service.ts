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
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4ODUwMDQzLCJleHAiOjE2NTg5MzY0NDN9.abale09Oo8z6TQ9pgHkhLTy4GE_MNgAMWjsS2hjy_URdezBzzytWN9hqC_TyOpYTXUZ5OHpitM_U5r3m3nypSQ`
  })
  

  getData():  Observable<Training[]> {
    return  this.http.get<Training[]>(this.trainingUrl+"/list", {headers: this.headers} );
  }

  verif(id_user, id_training){
    return  this.http.get(this.trainingUrl+"/verif/"+id_user+"/"+id_training, {headers: this.headers} );
  }

  allowd(id_user):  Observable<Training[]> {
    return  this.http.get<Training[]>(this.trainingUrl+"/allowedTrainings/"+id_user, {headers: this.headers} );
  }
}
