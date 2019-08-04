import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  sessionDataPlaceHolder =
    {
      _id: null,
      host_id: null,
      quiz_id: null,
      players: [],
      quiz_data: [],
      game_live: null,
      game_pin: null,
      players_answered: null,





    }





  private socket = io('http://localhost:3000')
  private central_session_data = new BehaviorSubject(this.sessionDataPlaceHolder);
  currentSessionData = this.central_session_data.asObservable();


  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  getCurrentSocket() {
    return this.socket;
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }


  hostCreateGame(data) {
    this.socket.emit('host-create-room', data);
    console.log(data)

  }

  getDisplayNames(data){
    console.log(data)
    this.socket.emit('get-display-name', data);
  }

  hostDisconnect(data){
    this.socket.emit('host-disconnect', data);
  }

  playerConnect(data){
    this.socket.emit('player-connect', data);
  }
  playerSuccessfullyConnect(){
    this.socket.on('player-join-success',function(data){
      console.log('yeet')

    })
  }

  changeSessionData(session_data) {
    this.central_session_data.next(session_data)
    console.log(this.currentSessionData)
  }

  getSessionData() {
    console.log("")
    //socket.on doesn't go with getSessionData
    this.socket.on('getSessionData', function (data) {
      console.log("Hi")
      console.log(data)
      this.sessionDataPlaceHolder = data;
      console.log(this.sessionDataPlaceHolder)



    })
  }

  chatJoin() {
  }
}
