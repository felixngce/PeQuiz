import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AuthService } from 'src/app/services/auth.service';
import { ElementFinder } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements OnInit {
  public counter;
  public toDbArray = [];
  public forLoopArray = [];
  public backToPlayer = [];
  public current_session_data;
  public current_qn_index;
  public isDataLoaded;
  public player;
  public answer_1_num = 0;
  public answer_2_num = 0;

  public answer_3_num = 0;

  public answer_4_num = 0;
  public game_pin;

  



  constructor(private webSocketService: WebSocketService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.game_pin = this.route.snapshot.paramMap.get('id')

    this.webSocketService.listen('one-player-answered').subscribe((data) => {
      console.log("Start of array 1")
      console.log(data)
      this.toDbArray.push(data);
      this.forLoopArray.push(data);
      

      if(this.toDbArray.length === this.current_session_data.player.length){
        this.answeringPhaseOver()
        this.router.navigate(['/game/play/host-cycle/host-answers/chart/' + this.game_pin])

      }
      
    })

    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.current_qn_index = this.current_session_data.current_question - 1
      this.startCountdown(this.current_session_data.quiz_data.questions[this.current_qn_index].time_limit)
      console.log(this.current_qn_index)
      this.isDataLoaded = true;
    });

  }

  answeringPhaseOver(){
    this.webSocketService.emit('player-unsorted-list', {"player_list":this.toDbArray, "host_id":this.current_session_data.host_id })
    console.log(this.toDbArray[0].answer)
    for(this.player = 0; this.player < this.toDbArray.length; this.player++){
      console.log(this.player)
      if(this.toDbArray[this.player].answer === 1){
        this.answer_1_num += 1;
      }
      else if(this.toDbArray[this.player].answer === 2){
        this.answer_2_num += 1;
      }
      else if(this.toDbArray[this.player].answer === 3){
        this.answer_3_num += 1;
      }
      else if(this.toDbArray[this.player].answer === 4){
        this.answer_4_num += 1;
      }
    }
    this.webSocketService.updateChartData([this.answer_1_num, this.answer_2_num, this.answer_3_num,this.answer_4_num])
    // this.current_session_data.player = this.toDbArray;
    // this.webSocketService.changeSessionData(this.current_session_data)
    console.log([this.answer_1_num, this.answer_2_num, this.answer_3_num,this.answer_4_num])
    this.toDbArray = [];
    this.forLoopArray = [];
    this.backToPlayer = [];
  }
  startCountdown(seconds) {
    this.counter = seconds;

    var interval = setInterval(() => {
      console.log(this.counter)
      this.counter--;


      if (this.counter == 0 || this.toDbArray.length === this.current_session_data.player.length) {


        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);

        
      };
    }, 1000);
  };

}
