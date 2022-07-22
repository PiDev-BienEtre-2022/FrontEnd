import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../../entities/goal';
import { GoalData } from '../data/GoalData';

@Injectable()
export class GoalService extends GoalData {
  id;
  idEval;
  idCat;
  private goalUrl: string;

  constructor(private http: HttpClient) {
    super();
    this.goalUrl = 'http://localhost:8084/api/goal';
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIiwiaWF0IjoxNjU4NDc1Njk3LCJleHAiOjE2NTg1NjIwOTd9.5W74eUFJmLpSbheFgMo4E-U_qShHfy_sYYDEwatWcPo_gXBc8OS4PJMNW5ML3So5kcfi3JqC4mtCDRaWUOUeAA`
  })
  

  getData(idEval):  Observable<Goal[]> {
    //return this.data;
    return  this.http.get<Goal[]>(this.goalUrl+"/GoalsEval/"+idEval, {headers: this.headers} );
  }

  add(Goal: Goal, idEval){
    this.id = Goal.category;
    delete Goal['category'];

    return this.http.post(this.goalUrl+"/add/"+idEval+"/"+this.id, Goal, {headers: this.headers});
  }

  getById(id : number){
    return this.http.get(this.goalUrl+ '/' + id , {headers: this.headers});
  }

  edit(goal: Goal, idEval, idCat){
    if(idCat != 0 ){
      this.id = idCat;
    }else{
      this.id= goal.category;
    }
    delete goal['category'];
    goal.titre = goal['title'];
  
    return this.http.put(this.goalUrl+ '/update/' + goal.id +'/'+idEval +'/'+ this.id, goal , {headers: this.headers});
  }

  editPercentage(goal: Goal, idEval, idCat){
    delete goal['category'];
    return this.http.put(this.goalUrl+ '/update/' + goal.id +'/'+idEval +'/'+ idCat, goal , {headers: this.headers});

  }
}
