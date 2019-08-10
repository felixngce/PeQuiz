import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-question',
  templateUrl: './player-question.component.html',
  styleUrls: ['./player-question.component.css']
})
export class PlayerQuestionComponent implements OnInit {
  public counter;
  public session_data;
  public isDataLoaded;
  public session_display_name;
  public session_room_id;

  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.session_room_id = this.route.snapshot.queryParamMap.get('id')
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')
    this.webSocketService.emit('getStartingData', this.session_room_id)
    this.webSocketService.getDisplayNames(this.session_room_id)

    this.startCountdown(5)

    this.webSocketService.currentSessionData.subscribe(data => {
      this.session_data = data;
      this.isDataLoaded = true;

    });

    this.webSocketService.listen('player-to-answering').subscribe((data) => {
      this.router.navigate(["/game/play/player-cycle/player-answer/" + data],{queryParams: {
        'name': this.session_display_name}} )
    })


  }
  // Each browser has its own subscription data. Pull session data and change the service data from there. Also test if game-navbar can simply subscribe to this data. If
  // able to, don't store PIN in session storage.

  startCountdown(seconds) {
    this.counter = seconds;

    var interval = setInterval(() => {
      this.counter--;


      if (this.counter == 0) {

        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);
        this.webSocketService.goToAnswering(this.session_room_id)
      };
    }, 1000);
  };

}



