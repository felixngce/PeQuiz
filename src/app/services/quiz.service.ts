import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }


  createQuizData = [
    {
      title : null,
      description : null,
      questions: []
      


    }
  ]

  private create_quiz_data = new BehaviorSubject(this.createQuizData);
  currentCreateQuizData = this.create_quiz_data.asObservable();

  changeCreateQuizData(quizData) {
    this.create_quiz_data.next(quizData)
    console.log(this.currentCreateQuizData)
  }


}
