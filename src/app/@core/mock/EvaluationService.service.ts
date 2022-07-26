import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../../entities/evaluation';
import { Goal } from '../../entities/goal';
import { User } from '../../entities/user';
import { EvaluationData } from '../data/EvaluationData';

@Injectable()
export class EvaluationService extends EvaluationData {

  private evaluationUrl: string;
  private userUrl: string;
  private goalUrl: string;
  private id: string;

  constructor(private http: HttpClient) {
    super();
    this.evaluationUrl = 'http://localhost:8084/api/evaluation';
    this.userUrl = 'http://localhost:8084/api/user';
    this.goalUrl = 'http://localhost:8084/api/goal';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4ODUwMDQzLCJleHAiOjE2NTg5MzY0NDN9.abale09Oo8z6TQ9pgHkhLTy4GE_MNgAMWjsS2hjy_URdezBzzytWN9hqC_TyOpYTXUZ5OHpitM_U5r3m3nypSQ`
  })
  
  getData():  Observable<Evaluation[]> {
    return  null;
  }

  getUsers(): Observable<User[]>{
    return  this.http.get<User[]>(this.userUrl+"/list", {headers: this.headers} );
  }

  getGoals(id : number): Observable<Goal[]>{
    return  this.http.get<Goal[]>(this.goalUrl+"/GoalsEval/"+id, {headers: this.headers} );
  }

  add(Evaluation: Evaluation){
    this.id = Evaluation.user.id;
    delete Evaluation['user'];
    return this.http.post(this.evaluationUrl+"/add/"+this.id, Evaluation, {headers: this.headers});
  }

  getNotValidated(): Observable<Evaluation[]>{
    return  this.http.get<Evaluation[]>(this.evaluationUrl+"/notValidated", {headers: this.headers} );
  }
  getInProgress(): Observable<Evaluation[]>{
    return  this.http.get<Evaluation[]>(this.evaluationUrl+"/inProgress", {headers: this.headers} );
  }
  getValidated(): Observable<Evaluation[]>{
    return  this.http.get<Evaluation[]>(this.evaluationUrl+"/Validated", {headers: this.headers} );
  }

  delete(id : number){
    return this.http.delete(this.evaluationUrl+"/delete/"+ id , {headers: this.headers});
  }
  
  getById(id : number){
    return this.http.get(this.evaluationUrl+ '/' + id , {headers: this.headers});
  }

  edit(id : number , Evaluation: Evaluation){
    delete Evaluation['user'];
    return this.http.put(this.evaluationUrl+ '/update/' + id , Evaluation , {headers: this.headers});
  }

  currentEval(id : number): Observable<Evaluation>{
    return  this.http.get<Evaluation>(this.evaluationUrl+"/currentEval/"+id, {headers: this.headers} );
  }

  MyEval(id : number): Observable<Evaluation[]>{
    return  this.http.get<Evaluation[]>(this.evaluationUrl+"/mesValidatedEval/"+id, {headers: this.headers} );
  }

  validate(id){
    return this.http.get(this.evaluationUrl+"/validate/"+ id , {headers: this.headers} );
  }
}
