import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-outcome',
  templateUrl: './player-outcome.component.html',
  styleUrls: ['./player-outcome.component.css']
})
export class PlayerOutcomeComponent implements OnInit {
  current_session_data;
  isDataLoaded :Boolean = false;
  current_qn_index;
  game_pin;
  session_display_name;
  answer_chosen;
  player_object
  question_data;
  session_room_id;
  public player_position;

  constructor(private webSocketService: WebSocketService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.session_room_id = this.route.snapshot.paramMap.get('id')
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')

    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.player_object = this.current_session_data.player.find(player => player.display_name === this.session_display_name)
      for(var i = 0;i < this.current_session_data.player.length;i++ ){
        if(this.player_object.display_name == this.current_session_data.player[i].display_name){
          this.player_position = i + 1;
        }
      }
      this.current_qn_index = this.current_session_data.current_question - 1
      this.question_data = this.current_session_data.quiz_data.questions[this.current_qn_index]
      this.isDataLoaded = true;

      
    });

    this.webSocketService.listen('to-player-question').subscribe((data)=>{
      this.webSocketService.changeSessionData(data);
      this.router.navigate(['/game/play/player-cycle/player-question/' + this.session_room_id],{queryParams:{"name": this.session_display_name}})
    })


    this.webSocketService.listen('go-to-award').subscribe((data) =>{
      this.router.navigate(['/game/play/player-award/'+ this.session_room_id],{queryParams:{"name": this.session_display_name}})
    })
  }

}
