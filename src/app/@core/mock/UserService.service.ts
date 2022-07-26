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
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4ODUwMDQzLCJleHAiOjE2NTg5MzY0NDN9.abale09Oo8z6TQ9pgHkhLTy4GE_MNgAMWjsS2hjy_URdezBzzytWN9hqC_TyOpYTXUZ5OHpitM_U5r3m3nypSQ`
  })
  

  getData():  Observable<User[]> {
    //return this.data;
    return  this.http.get<User[]>(this.userUrl+"/list", {headers: this.headers} );
  }
  getById(id : number){
    return this.http.get(this.userUrl+ '/' + id , {headers: this.headers});
  }
  
}
