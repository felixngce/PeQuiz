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
  public user_id = this.authService.getSecureToken;


  ngOnInit() {
    console.log("daf")

    this.webSocketService.listen('getSessionData').subscribe((data) => {
      console.log(data)
      this.session_data = data;
      this.isDataLoaded = true
      this.webSocketService.changeSessionData(this.session_data)
      console.log(this.session_data)

    })

    this.webSocketService.listen("sending-session-dataa").subscribe((data)=>{
      console.log("hi")
      console.log(data)
      this.session_data = data;
      this.isDataLoaded = true
      this.webSocketService.changeSessionData(this.session_data)
    })

    this.yeet()

    


 
    

    // console.log(this.session_data)
    // this.webSocketService.currentSessionData.subscribe(data => {
    //   this.session_data = data;
    //   console.log(this.session_data)
    //   this.isDataLoaded = true;

    // });


  }
 yeet(){
  this.webSocketService.listen("sending-session-dataa").subscribe((data)=>{
    console.log("hi")
    console.log(data)
    this.session_data = data;
    this.isDataLoaded = true
    this.webSocketService.changeSessionData(this.session_data)
  })
}
  routeToHome(){
    this.router.navigate(["/main/home/" + this.user_id])
  }

}
