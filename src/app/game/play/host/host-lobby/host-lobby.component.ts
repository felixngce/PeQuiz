import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from 'socket.io-client';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-host-lobby',
  templateUrl: './host-lobby.component.html',
  styleUrls: ['./host-lobby.component.css']
})
export class HostLobbyComponent implements OnInit {

  constructor(private webSocketService: WebSocketService, private router: Router, private authService: AuthService) {
    }

  public session_data;
  public isDataLoaded : Boolean = false;
  public user_id = this.authService.getSecureToken();
  sessionDataPlaceHolder =
  {
    _id: null,
    host_id: null,
    quiz_id: null,
    player: [],
    quiz_data: [],
    game_live: null,
    game_pin: null,
    current_question: null,
  }


  ngOnInit() {

    this.webSocketService.listen('getSessionData').subscribe((data) => {
      this.session_data = data;
      this.isDataLoaded = true
      this.webSocketService.changeSessionData(this.session_data)

    })
  }

  routeToHome(){
    this.router.navigate(["/main/home/" + this.user_id])
  }

  startGame(){
    this.webSocketService.hostStartGame(this.session_data)
    this.webSocketService.changeSessionData(this.session_data)
    this.router.navigate(["/game/play/host-cycle/host-question/" + this.session_data.game_pin])
  }

}
