import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  readonly API_URL='http://localhost:8089';

  constructor(private httpClient: HttpClient) { }
}
