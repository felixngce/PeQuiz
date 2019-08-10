import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from 'src/app/services/user/user-get.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common'
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-quiz-description-column',
  templateUrl: './quiz-description-column.component.html',
  styleUrls: ['./quiz-description-column.component.css']
})
export class QuizDescriptionColumnComponent implements OnInit {

  public user_data;
  public user_id;
  public quiz_date;
  public updateQuizArray;
  public quiz_object;


  constructor(private router:Router,private userGetService: UserGetService, private authService: AuthService,public datepipe: DatePipe,private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.user_id = this.authService.getSecureToken()
    });
    this.findUserById()
  }

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        var i = 0;
        for (let quiz of this.user_data[0].quiz_created){
          
        this.user_data[0].quiz_created[i].quiz_date_created = this.datepipe.transform(this.user_data[0].quiz_created[i].quiz_date_created,'dd MMMM yy')
           i += 1
        }

        this.userGetService.changeData(this.user_data)




      });
  }

  routeToDetails(i){
    this.router.navigate(['/main/quiz/details/' + i])
  }

  deleteQuiz(index){
    this.user_data[0].quiz_created.splice(index, 1)
    this.updateQuizArray = this.user_data[0].quiz_created
    this.userGetService.deleteQuiz(this.user_id, this.updateQuizArray).subscribe(results => {
      this.findUserById()


    });
  }
  routeHostToGame(quiz_id){
    this.quiz_object = this.user_data[0].quiz_created[quiz_id]
    this.webSocketService.hostCreateGame({host_id: this.user_id, quiz_id: quiz_id, quiz_data:this.quiz_object})
    this.router.navigate(['/game/play/host/lobby'])
  }

}


