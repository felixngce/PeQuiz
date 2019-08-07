import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-data-bar',
  templateUrl: './player-data-bar.component.html',
  styleUrls: ['./player-data-bar.component.css']
})
export class PlayerDataBarComponent implements OnInit {
  public session_data;
  public isDataLoaded : Boolean = false;
  public session_display_name;
  public player_object;

  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')
    console.log(this.session_display_name)


    this.webSocketService.currentSessionData.subscribe(data => {
      this.session_data = data;
      console.log(this.session_data)
      this.isDataLoaded = true;
      this.player_object = this.session_data.player.find(player => player.display_name === this.session_display_name)
      console.log(this.player_object)


    });
  }

  routeToHome(){
    this.router.navigate(['/'])
  }

}
