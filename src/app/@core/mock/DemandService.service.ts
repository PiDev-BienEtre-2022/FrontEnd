import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demand } from '../../entities/demand';
import { DemandData } from '../data/DemandData';

@Injectable()
export class DemandService extends DemandData {

  private demandUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.demandUrl = 'http://localhost:8084/api/';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaG9mcmFuZSIsImlhdCI6MTY1ODg1MzgzNywiZXhwIjoxNjU4OTQwMjM3fQ.rVdoqbjsKDazl2Zbe8DT1zh_iqHXbSA8Vqsb6xcGANTXGeGQeF2SA1iROByiskgFg3tou5znxCwzDqIrNeoEKw`
  })
  

  getData():  Observable<Demand[]> {
    //return this.data;
   
    return  this.http.get<Demand[]>(this.demandUrl + 'listeDemande', {headers: this.headers} );
  }

  addData(data: Demand, userId: number): Observable<any> {
    return this.http.post(this.demandUrl + 'ajouterDemande/' + userId, data, {headers: this.headers});
  }

  editData(data: Demand): Observable<any> {
    return this.http.put(this.demandUrl + 'modifierDemande', data, {headers: this.headers});
  }

  
  getDataByUserId(userId: number): Observable<Demand[]> {
    return  this.http.get<Demand[]>(this.demandUrl + 'getDemandesByUser/' + userId, {headers: this.headers} );
  }
}
