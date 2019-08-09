import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-wait',
  templateUrl: './player-wait.component.html',
  styleUrls: ['./player-wait.component.css']
})
export class PlayerWaitComponent implements OnInit {
  public current_session_data;
  public isDataLoaded :Boolean = false;
  public current_qn_index;
  public game_pin;
  public session_display_name;
  public answer_chosen;
  public player_object
  public question_data;
  public session_room_id;


  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.session_room_id = this.route.snapshot.queryParamMap.get('id')
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')
    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.player_object = this.current_session_data.player.find(player => player.display_name === this.session_display_name)
      
      this.current_qn_index = this.current_session_data.current_question - 1
      this.question_data = this.current_session_data.quiz_data.questions[this.current_qn_index]
      console.log(this.current_qn_index)
      this.isDataLoaded = true;
      console.log(this.current_session_data)
    });

    this.webSocketService.listen('just-player-data').subscribe((data) => {

      this.current_session_data.player = data;
      console.log(this.current_session_data)
      this.webSocketService.changeSessionData(this.current_session_data)

      this.router.navigate(["/game/play/player-cycle/player-outcome/" + this.session_room_id],{queryParams: {
        'name': this.session_display_name}} )
    })
  }

}
