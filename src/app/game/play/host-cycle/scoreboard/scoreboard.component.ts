import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  game_pin;
  public current_session_data;
  public scoreboard_array = [];
  public host_id;

  constructor(private route: ActivatedRoute, private router: Router, private webSocketService: WebSocketService, private authService: AuthService) { }

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id');
    this.host_id = this.authService.getSecureToken()
    this.webSocketService.emit('get-new-session-data', this.host_id);

    this.webSocketService.listen('getting-new-session-data').subscribe((data)=>{
      this.current_session_data = data;
      for(var i = 0; i < this.current_session_data.player.length ; i++){
        if(i < 5){
          this.scoreboard_array.push(this.current_session_data.player[i])
        }
      }

    })

    this.webSocketService.listen('current-question-updated').subscribe((data)=>{
      this.current_session_data.current_question += 1;
      this.webSocketService.changeSessionData(this.current_session_data);

      this.webSocketService.emit('player-back-to-question', this.host_id)
      this.router.navigate(["/game/play/host-cycle/host-question/" + this.game_pin])
    })


  }

  loopOrPodium(){
    if(this.current_session_data.current_question != this.current_session_data.quiz_data.questions.length){
      this.webSocketService.emit('update-current-question', {"new_current_question":this.current_session_data.current_question + 1,
      "game_pin": this.current_session_data.game_pin, "host_id": this.host_id})

    }
    else{
      this.webSocketService.emit('player-to-award', this.game_pin);
      this.router.navigate(['/game/play/podium/' + this.game_pin])

    }
  }


}
