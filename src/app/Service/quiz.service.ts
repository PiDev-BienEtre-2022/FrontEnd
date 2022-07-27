import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '../entities/answer';
import { Quiz } from '../entities/quiz';

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
  saveQuiz(quiz : Quiz){
    return this.httpClient.post(`${this.API_URL}/addquiz`,quiz)
  }
  Search(filter : any){
    return this.httpClient.get(`${this.API_URL}/search`,filter)
  }
  getbyQuizId(idQuiz:any){
    return this.httpClient.get(`${this.API_URL}/findquiz/${idQuiz}`)
  }
  updateQuiz(idQuiz:any,quiz : Quiz){
    return this.httpClient.post(`${this.API_URL}/findquiz/${idQuiz}`,quiz)
  }
  findQuestionByQuiz(idQuiz:any,quiz : Quiz){
    return this.httpClient.post(`${this.API_URL}/findquiz/${idQuiz}`,quiz)
  }
  publishQuiz(idQuiz:any){
    return this.httpClient.post(`${this.API_URL}/publish/${idQuiz}`,null)
  }
  playQuiz(idQuiz:any,answers : Answer[]){
    return this.httpClient.post(`${this.API_URL}/findquiz/${idQuiz}`,answers)
  }
}
