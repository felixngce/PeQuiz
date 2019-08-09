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
      player: [],
      quiz_data: [],
      game_live: null,
      game_pin: null,
      current_question: null,
    }

    chartArray = [null];

  private socket = io('http://localhost:3000')
  private central_session_data = new BehaviorSubject(this.sessionDataPlaceHolder);
  currentSessionData = this.central_session_data.asObservable();

  private to_chart_array = new BehaviorSubject(this.chartArray);
  getChartArray  = this.to_chart_array.asObservable();

  changeSessionData(session_data) {
    this.central_session_data.next(session_data)
    console.log(this.currentSessionData)
  }

  updateChartData(chart_data){
    this.to_chart_array.next(chart_data)
    console.log(this.to_chart_array)
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

  setSessionGamePin(game_pin: any) {
    sessionStorage.setItem("gamePIN", game_pin)
    console.log(sessionStorage);
  }

  getSessionGamePin() {

    return sessionStorage.getItem("gamePIN")

  }

  removeSessionGamePin() {
    sessionStorage.removeItem("gamePIN");
    console.log(sessionStorage);
    
    }

  hostCreateGame(data) {
    this.socket.emit('host-create-room', data);
    console.log(data)

  }

  getDisplayNames(data) {
    console.log(data)
    this.socket.emit('get-display-name', data);
  }

  hostDisconnect(data) {
    this.socket.emit('host-disconnect', data);
    console.log('host disconnected')
    console.log(data)
  }

  playerConnect(data) {
    this.socket.emit('player-connect', data);
  }
  playerSuccessfullyConnect() {
    this.socket.on('player-join-success', function (data) {
      console.log('yeet')

    })


  }
  hostStartGame(game_pin) {
    this.socket.emit('game-starting', game_pin)
  }

  goToAnswering(game_pin){
    this.socket.emit('go-to-answering', game_pin)
  }

  getNewSessionData(game_pin){
    this.socket.emit('get-new-session-data',game_pin)
  }



  chatJoin() {
  }
}
