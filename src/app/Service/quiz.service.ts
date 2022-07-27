import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly API_URL='http://localhost:8089';

  constructor(private httpClient: HttpClient) { }

  getAllQuiz(){
    return this.httpClient.get(`${this.API_URL}/findallquiz`)
  }
  deleteQuiz(idQuiz:any){
    return this.httpClient.delete(`${this.API_URL}/deletequiz/${idQuiz}`)
  }
}
