import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  sessionDataPlaceHolder = 
    {
      _id: null,
      host_id : null,
      quiz_id : null,
      players: [],
      quiz_data: [],
      game_live: null,
      game_pin: null,
      players_answered: null,
      
      
      


    }


  


private socket = io('http://localhost:3000')
private central_session_data = new BehaviorSubject(this.sessionDataPlaceHolder);
currentSessionData = this.central_session_data.asObservable();


hostCreateGame(data){
  this.socket.emit('host-create-room',data);
  console.log(data)

}
changeSessionData(session_data) {
  this.central_session_data.next(session_data)
  console.log(this.currentSessionData)
}

getSessionData(){
  console.log("")
  //socket.on doesn't go with getSessionData
  this.socket.on('getSessionData',function(data){
    console.log("Hi")
    console.log(data)
    this.sessionDataPlaceHolder = data;
    console.log(this.sessionDataPlaceHolder)
    this.central_session_data.next(data)



  })
}

chatJoin(){
}
}
