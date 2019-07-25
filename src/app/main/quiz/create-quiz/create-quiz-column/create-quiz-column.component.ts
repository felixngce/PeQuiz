import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-quiz-column',
  templateUrl: './create-quiz-column.component.html',
  styleUrls: ['./create-quiz-column.component.css']
})
export class CreateQuizColumnComponent implements OnInit {

  constructor( private fb : FormBuilder,private router:Router, private quizService: QuizService, private authService: AuthService) { }

  addQuizForm: FormGroup;
  public createQuizData;
  public newQuizData;
  public localStorageData;
  public isDataLoaded : Boolean = false;
  public question_url_num;
  public questionArray;
  public  user_id;
  public resetDataTemplate;
  public displayQuestions: Boolean;

  ngOnInit() {

    this.resetDataTemplate = [
      {
        title : null,
        description : null,
        questions: []
        
  
  
      }
    ]

    this.user_id = this.authService.getSecureToken() 
    this.addQuizForm = this.fb.group({
      title: '',
      description: ''
 

      });

      this.quizService.currentCreateQuizData.subscribe(data => {
        if(data[0].questions.length == 0){
          this.createQuizData = JSON.parse(localStorage.getItem('quizArray'));
          this.quizService.changeCreateQuizData(this.createQuizData)




        }else{
          localStorage.setItem('quizArray', JSON.stringify(data));
          this.createQuizData = data;
        }


        this.isDataLoaded = true;

        console.log("this is the pulled data")
        console.log(this.createQuizData)

    
  
      });
      console.log(this.createQuizData[0].questions[0].question_string)
      this.questionArray = this.createQuizData[0].questions
      console.log(this.questionArray)


      console.log(localStorage.getItem('quizArray'));

      

  }
  routeToQuestion(){
    this.question_url_num =  this.createQuizData[0].questions.length + 1
    this.router.navigate(["/main/quiz/create/question/" + this.question_url_num])
  }


  routeToEdit(index){
    this.question_url_num =  index + 1
    this.router.navigate(["/main/quiz/create/question/" + this.question_url_num])

  }


  deleteQuestion(index){
    this.createQuizData[0].questions.splice(index,1)
    this.quizService.changeCreateQuizData(this.createQuizData)


  }

  onSubmitQuiz(){

    this.quizService.submitNewQuiz(this.user_id,this.addQuizForm.value.title, this.addQuizForm.value.description, this.createQuizData[0].questions)
    .subscribe(results => {
      console.log("This shows that quiz submit is working")
      console.log(results)
      // localStorage.removeItem('quizArray')
      // this.quizService.changeCreateQuizData(this.resetDataTemplate)

      this.router.navigate(["/main/home"])
    });

    
  }


}
