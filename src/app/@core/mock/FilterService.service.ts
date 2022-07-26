import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../entities/filter';
import { FilterData } from '../data/FilterData';

@Injectable()
export class FilterService extends FilterData {

  private filterUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.filterUrl = 'http://localhost:8084/api/';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaG9mcmFuZSIsImlhdCI6MTY1ODg1MzgzNywiZXhwIjoxNjU4OTQwMjM3fQ.rVdoqbjsKDazl2Zbe8DT1zh_iqHXbSA8Vqsb6xcGANTXGeGQeF2SA1iROByiskgFg3tou5znxCwzDqIrNeoEKw`
  })
  

  getData():  Observable<Filter[]> {
    //return this.data;
   
    return  this.http.get<Filter[]>(this.filterUrl + 'listeFilter', {headers: this.headers} );
  }

  addData(data: Filter): Observable<any> {
    return this.http.post(this.filterUrl + 'ajouterFilter', data, {headers: this.headers});
  }

  editData(data: Filter): Observable<any> {
    return this.http.put(this.filterUrl + 'modifierFilter', data, {headers: this.headers});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.filterUrl + 'supprimerFilter/' + id,{headers: this.headers});
  }

  process(id: number): Observable<any> {
    return this.http.get(this.filterUrl + 'executeFilter/' + id,{headers: this.headers});
  }
  getDataByUserId(userId: number): Observable<Filter> {
    return  this.http.get<Filter>(this.filterUrl + 'UserFilter/' + userId, {headers: this.headers} );
  }
}
