import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';
import { UserrData } from '../data/UserData';

@Injectable()
export class UserrService extends UserrData {

  private userUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.userUrl = 'http://localhost:8084/api/user';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4NDc1Njk3LCJleHAiOjE2NTg1NjIwOTd9.5W74eUFJmLpSbheFgMo4E-U_qShHfy_sYYDEwatWcPo_gXBc8OS4PJMNW5ML3So5kcfi3JqC4mtCDRaWUOUeAA`
  })
  

  getData():  Observable<User[]> {
    //return this.data;
    return  this.http.get<User[]>(this.userUrl+"/list", {headers: this.headers} );
  }
  getById(id : number){
    return this.http.get(this.userUrl+ '/' + id , {headers: this.headers});
  }
  
}
