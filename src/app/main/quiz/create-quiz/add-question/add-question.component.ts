import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addQnForm: FormGroup;
  public createQuizData;
  public newQuizData;
  public qnFormArray;

  constructor(private fb : FormBuilder,private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    this.addQnForm = this.fb.group({
      question_string: '',
      answer_1: '',
      answer_2:'',
      answer_3:'',
      answer_4:'',
      time_limit:'',
      correct_answer:''

      });

      this.quizService.currentCreateQuizData.subscribe(data => {
        this.createQuizData = data;
        console.log("this is the pulled data")
        console.log(this.createQuizData[0].questions)
    
  
      });
  }

  onAddQn(){
    this.qnFormArray = {"question_string": this.addQnForm.value.question_string, "time_limit": this.addQnForm.value.time_limit,
     "correct_answer": this.addQnForm.value.correct_answer, answers:[this.addQnForm.value.answer_1,this.addQnForm.value.answer_2,this.addQnForm.value.answer_3
    ,this.addQnForm.value.answer_4]}
    this.createQuizData[0].questions.push(this.qnFormArray)
    this.newQuizData = this.createQuizData
    console.log("This is the final sent data")
    console.log(this.newQuizData)
    this.quizService.changeCreateQuizData(this.newQuizData)
    this.router.navigate(["/main/quiz/create/overview"])
  }

  routeToCreate(){
    this.router.navigate(["/main/quiz/create/overview"])
  }

}

