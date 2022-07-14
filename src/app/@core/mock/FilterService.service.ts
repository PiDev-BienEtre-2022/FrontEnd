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
    this.filterUrl = 'http://localhost:8084/listeFilter';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnaG9mcmFuZSIsImlhdCI6MTY1NzczMTI3OSwiZXhwIjoxNjU3ODE3Njc5fQ.kSHpsAE5U6ydF6lUQsdfoDNp8za5lLwcICFCSFk52pe2diXw-zocXJ8EbmoTFqsDbTyEskXPI-3JHdMolMQqCg`
  })
  

  getData():  Observable<Filter[]> {
    //return this.data;
   
    return  this.http.get<Filter[]>(this.filterUrl, {headers: this.headers} );
  }
}
