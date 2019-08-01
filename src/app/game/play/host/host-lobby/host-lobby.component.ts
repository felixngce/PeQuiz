import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-host-lobby',
  templateUrl: './host-lobby.component.html',
  styleUrls: ['./host-lobby.component.css']
})
export class HostLobbyComponent implements OnInit {

  constructor(private webSocketService: WebSocketService) {
    }

  public session_data;
  public isDataLoaded : Boolean = false;


  ngOnInit() {
    console.log("daf")

    this.webSocketService.listen('getSessionData').subscribe((data) => {
      console.log(data)
      this.session_data = data;
      this.isDataLoaded = true
      this.webSocketService.changeSessionData(this.session_data)

    })

 
    

    // console.log(this.session_data)
    // this.webSocketService.currentSessionData.subscribe(data => {
    //   this.session_data = data;
    //   console.log(this.session_data)
    //   this.isDataLoaded = true;

    // });


  }

}
