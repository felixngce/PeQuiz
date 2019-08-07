import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  public game_pin;
  public display_name;

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.webSocketService.getSessionGamePin())


    this.game_pin = this.route.snapshot.paramMap.get('id')
    this.display_name = this.route.snapshot.queryParamMap.get('name')
    this.webSocketService.listen("game-starting-players").subscribe((data)=>{
      console.log("hi")
      console.log(data)
      this.webSocketService.changeSessionData(data);
      this.router.navigate(["/game/play/player-cycle/player-question/" + this.game_pin ],{queryParams: {
        'name': this.display_name}} )


    })
  }

}
