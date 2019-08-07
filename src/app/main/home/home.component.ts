import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserGetService} from '../../services/user/user-get.service';
import {ActivatedRoute, Router} from'@angular/router'
import { HttpClientModule } from '@angular/common/http'; 
import { QuizService } from 'src/app/services/quiz.service';
import {WebSocketService} from 'src/app/services/web-socket.service'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_id;
  public user_data;
  public validateCreateQuiz;
  public quiz_object;
  resetDataTemplate = [
    {
      title : 'resetDataTemplate',
      description : null,
      questions: [ {"question_string": "Example Question", "time_limit":20, "correct_answer":1,"answers":["answer 1", "answer 2", "answer 3", "answer 4"]}]
      


    }
  ]
  

  constructor(private webSocketService:WebSocketService, private route: ActivatedRoute, private router:Router, private userGetService: UserGetService, private authService: AuthService, private quizService: QuizService) { }

  ngOnInit() {
    this.userGetService.currentUserData.subscribe(data => {

      this.user_data = data;

    });

    this.quizService.currentCreateQuizData.subscribe(data => {
      this.validateCreateQuiz = data;

    })

  }

  routeToCreate(){



    if(this.validateCreateQuiz == 'helloo'){
    this.quizService.changeCreateQuizData(this.resetDataTemplate)
    }
    this.router.navigate(["/main/quiz/create/overview"])


  }



  


  




}
