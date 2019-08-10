import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetService } from 'src/app/services/user/user-get.service';

@Component({
  selector: 'app-create-quiz-column',
  templateUrl: './create-quiz-column.component.html',
  styleUrls: ['./create-quiz-column.component.css']
})
export class CreateQuizColumnComponent implements OnInit {

  constructor( private fb : FormBuilder,private router:Router, private quizService: QuizService, private authService: AuthService, private userGetService: UserGetService) { }

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
  public browserStoredData;
  public user_data;
  public title_string="";
  public deleteBoolean = false;

  ngOnInit() {

     this.browserStoredData = JSON.parse(localStorage.getItem('quizArray'))



     this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;




    });

    this.resetDataTemplate = [
      {
        title : 'resetDataTemplate',
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
        //If user refreshes the page and theres data left, use that data
        if(data[0].questions.length == 0 && this.browserStoredData[0].questions.length > 1){
          this.createQuizData = JSON.parse(localStorage.getItem('quizArray'));
          this.quizService.changeCreateQuizData(this.createQuizData)




        }else{
          localStorage.setItem('quizArray', JSON.stringify(data));
          this.createQuizData = data;
        }


        this.isDataLoaded = true;
 
      });
      this.questionArray = this.createQuizData[0].questions
      
  }
  routeToQuestion(){
    this.changingTitle()
    this.question_url_num =  this.createQuizData[0].questions.length + 1
    this.router.navigate(["/main/quiz/create/question/" + this.question_url_num])
  }


  routeToEdit(index){
    this.changingTitle()
    this.question_url_num =  index + 1
    this.router.navigate(["/main/quiz/create/question/" + this.question_url_num])

  }


  deleteQuestion(index){
    this.createQuizData[0].questions.splice(index,1)
    this.quizService.changeCreateQuizData(this.createQuizData)
    this.deleteBoolean = true;


  }

  onSubmitQuiz(){

    if(this.addQuizForm.value.title.length == 0 || this.addQuizForm.value.description.length == 0){
      this.addQuizForm = this.fb.group({
        title: this.createQuizData[0].title,
        description: this.createQuizData[0].description
   
  
        });


    }

    this.quizService.submitNewQuiz(this.user_id,this.addQuizForm.value.title, this.addQuizForm.value.description, this.createQuizData[0].questions)
    .subscribe(results => {

      localStorage.removeItem('quizArray')


      localStorage.setItem('quizArray', JSON.stringify(this.resetDataTemplate));

      this.router.navigate(["/main/home/" + this.user_id])
    });
    this.quizService.changeCreateQuizData("helloo")

    
  }

  changingTitle(){
    if(this.addQuizForm.value.title != 0){
      this.createQuizData[0].title = this.addQuizForm.value.title;
      this.quizService.changeCreateQuizData(this.createQuizData)

    }

    if(this.addQuizForm.value.description != 0){
      this.createQuizData[0].description = this.addQuizForm.value.description;
      this.quizService.changeCreateQuizData(this.createQuizData)

    }

    }


}
