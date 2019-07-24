import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-quiz-column',
  templateUrl: './create-quiz-column.component.html',
  styleUrls: ['./create-quiz-column.component.css']
})
export class CreateQuizColumnComponent implements OnInit {

  constructor( private fb : FormBuilder,private router:Router, private quizService: QuizService) { }

  addQuizForm: FormGroup;
  public createQuizData;
  public newQuizData;
  public localStorageData;
  public isDataLoaded : Boolean = false;

  ngOnInit() {

    this.addQuizForm = this.fb.group({
      question_string: '',
      answer_1: '',
      answer_2:'',
      answer_3:'',
      answer_4:'',
      time_limit:'',
      correct_answer:''

      });

      this.quizService.currentCreateQuizData.subscribe(data => {
        if(data[0].questions.length == 0){
          this.createQuizData = JSON.parse(localStorage.getItem('quizArray'));

        }else{
          localStorage.setItem('quizArray', JSON.stringify(data));
          this.createQuizData = data;
        }


        this.isDataLoaded = true;

        console.log("this is the pulled data")
        console.log(this.createQuizData)

    
  
      });
      console.log(this.createQuizData[0].questions[0].question_string)

  }
  routeToQuestion(){
    this.router.navigate(["/main/quiz/create/question/" + 'yeet'])
  }


}
