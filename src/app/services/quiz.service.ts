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
      questions: [
        {"question_string": "Example Question", "time_limit":20, "correct_answer":1,"answers":["answer 1", "answer 2", "answer 3", "answer 4"]}
      ]
      


    }
  ]



  private create_quiz_data = new BehaviorSubject(this.createQuizData);
  currentCreateQuizData = this.create_quiz_data.asObservable();

  changeCreateQuizData(quizData) {
    this.create_quiz_data.next(quizData)
  }

  submitNewQuiz(user_id, title, description, questions){
    return this.http.post<any[]>('http://localhost:3000/api/newQuiz/', {
      'user_created': user_id,
      'title': title,
      'description': description,
      'questions' : questions
    }
    
        );
  }


}
