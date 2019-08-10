import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-award',
  templateUrl: './player-award.component.html',
  styleUrls: ['./player-award.component.css']
})
export class PlayerAwardComponent implements OnInit {
  public current_session_data;
  public session_room_id;
  public session_display_name;
  public player_object;
  public player_position;

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.session_room_id = this.route.snapshot.paramMap.get('id')
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')

    this.webSocketService.currentSessionData.subscribe((data) => {
      this.current_session_data = data;
      this.player_object = this.current_session_data.player.find(player => player.display_name === this.session_display_name)
      for(var i = 0;i < this.current_session_data.player.length;i++ ){
        if(this.player_object.display_name == this.current_session_data.player[i].display_name){
          this.player_position = i + 1;
        }
      }
    })
  }

  routeToHome(){
    this.router.navigate(['/cover'])
  }

  routeToJoin(){
    this.router.navigate(['/game/join']);
  }

}
