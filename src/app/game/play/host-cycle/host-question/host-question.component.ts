import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-host-question',
  templateUrl: './host-question.component.html',
  styleUrls: ['./host-question.component.css']
})
export class HostQuestionComponent implements OnInit {
  public counter;
  public game_pin;
  public session_data;
  public current_session_data;
  public user_id;



  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id')
    this.user_id = this.authService.getSecureToken()

    this.webSocketService.getNewSessionData(this.user_id);


    
    this.webSocketService.listen('getting-new-session-data').subscribe((data)=>{
      this.session_data = data;
      this.webSocketService.changeSessionData(this.session_data)
    })


    this.startCountdown(5)

  }

  startCountdown(seconds) {
    this.counter = seconds;

    var interval = setInterval(() => {

      this.counter--;


      if (this.counter == 0) {

        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);
        this.webSocketService.goToAnswering(this.game_pin)
        this.router.navigate(["/game/play/host-cycle/host-answers/in-progress/" + this.game_pin])
        
      };
    }, 1000);
  };

}
