import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {
  public game_pin;
  public user_id = this.authService.getSecureToken();
  public current_session_data;
  public scoreboard_array = [];
  public trial;
  public yeet;
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

  chartArray = [null];

  constructor(private router:Router, private webSocketService: WebSocketService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {


    this.game_pin = this.route.snapshot.paramMap.get('id');
    this.yeet = 'yo' + 1 + 'its me'
    this.trial = {};
    this.trial[this.yeet] = 'yohh';
    console.log(this.trial)
    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.webSocketService.emit('update-quiz-plays', this.current_session_data);

      for(var i = 0; i < this.current_session_data.player.length ; i++){
        if(i < 5){
          this.scoreboard_array.push(this.current_session_data.player[i])
        }
      }
    })
  }

  routeToHome(){
    this.webSocketService.hostDisconnect(this.current_session_data)
    this.webSocketService.changeSessionData(this.sessionDataPlaceHolder);
    this.webSocketService.updateChartData(this.chartArray)
    this.router.navigate(['/main/home/' + this.user_id])

  }

}
