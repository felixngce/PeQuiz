import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from '../services/user/user-get.service';
import { AuthService } from '../services/auth.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor(private router: Router, private userGetService: UserGetService, private authService: AuthService, private webSocketService: WebSocketService) { }

  public user_id;
  public user_data;
  public session_data;


  sessionDataPlaceHolder =
  {
    _id: null,
    host_id: null,
    quiz_id: null,
    players: [],
    quiz_data: [],
    game_live: null,
    game_pin: null,
    players_answered: null,

  }

  ngOnInit() {
    
    
      // this.router.navigate(['/main/home']);
      this.user_id = this.authService.getSecureToken()
      this.findUserById()
    this.deleteSessionInfo()
    console.log(this.session_data)
    this.webSocketService.hostDisconnect(this.session_data)

    this.webSocketService.changeSessionData(this.sessionDataPlaceHolder)




  
  }
deleteSessionInfo(){
  this.webSocketService.currentSessionData.subscribe(data => {
    this.session_data = data;

    console.log(this.session_data)



  });
}
  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        console.log("This is the user data sent to service")
        console.log(this.user_data);

        console.log("This is me changing the service data!")
        this.userGetService.changeData(this.user_data)




      });
  }

}
