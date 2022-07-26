import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../entities/category';
import { CategoryData } from '../data/CategoryData';

@Injectable()
export class CategoryService extends CategoryData {

  private categoryUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.categoryUrl = 'http://localhost:8084/api/category';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4ODUwMDQzLCJleHAiOjE2NTg5MzY0NDN9.abale09Oo8z6TQ9pgHkhLTy4GE_MNgAMWjsS2hjy_URdezBzzytWN9hqC_TyOpYTXUZ5OHpitM_U5r3m3nypSQ`
  })
  

  getData():  Observable<Category[]> {
    //return this.data;
    return  this.http.get<Category[]>(this.categoryUrl+"/list", {headers: this.headers} );
  }

  add(Category: Category){
    return this.http.post(this.categoryUrl+"/add", Category, {headers: this.headers});
  }

  delete(id : number ){
    return this.http.delete(this.categoryUrl+"/delete/"+ id , {headers: this.headers});
  }

  getById(id : number){
    return this.http.get(this.categoryUrl+ '/' + id , {headers: this.headers});
  }

  edit(id : number , Category: Category){
    return this.http.put(this.categoryUrl+ '/update/' + id , Category , {headers: this.headers});
  }

  getDataByDomain(id):  Observable<Category[]> {
    return  this.http.get<Category[]>(this.categoryUrl+"/domain/"+id, {headers: this.headers} );
  }
}
