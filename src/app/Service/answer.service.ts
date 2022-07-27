import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  readonly API_URL='http://localhost:8089';

  constructor(private httpClient: HttpClient) { }

  
}
