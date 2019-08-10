import { Component, OnInit } from '@angular/core';
import { UserGetService } from 'src/app/services/user/user-get.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-my-quiz-column',
  templateUrl: './my-quiz-column.component.html',
  styleUrls: ['./my-quiz-column.component.css']
})
export class MyQuizColumnComponent implements OnInit {

  public user_data;
  public user_id;
  public quiz_object;
  public isDataLoaded = false;

  constructor(private webSocketService:WebSocketService,private router:Router,private userGetService: UserGetService, private authService: AuthService) { }

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

        this.userGetService.changeData(this.user_data)

      this.isDataLoaded = true;



      });
  }

  routeToQuizDesc(){
    this.router.navigate(["/main/quiz/desc/",this.user_data[0]._id])
  }

  routeToDetails(i){
    this.router.navigate(['/main/quiz/details/' + i])
  }

  routeHostToGame(quiz_id){
    this.quiz_object = this.user_data[0].quiz_created[quiz_id]
    this.webSocketService.hostCreateGame({host_id: this.user_id, quiz_id: quiz_id, quiz_data:this.quiz_object})
    this.router.navigate(['/game/play/host/lobby'])
  }

}
