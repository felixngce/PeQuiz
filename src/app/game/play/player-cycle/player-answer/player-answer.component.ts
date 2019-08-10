import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-answer',
  templateUrl: './player-answer.component.html',
  styleUrls: ['./player-answer.component.css']
})
export class PlayerAnswerComponent implements OnInit {
  current_session_data;
  isDataLoaded :Boolean = false;
  current_qn_index;
  game_pin;
  session_display_name;
  answer_chosen;
  counter;
  question_data;
  points = 0;
  player_object;

  qn_time_limit;
  answer_outcome = false;
  public player_answered: Boolean= false;

  constructor(private webSocketService: WebSocketService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id')
    this.session_display_name = this.route.snapshot.queryParamMap.get('name')



    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.player_object = this.current_session_data.player.find(player => player.display_name === this.session_display_name)
      
      this.current_qn_index = this.current_session_data.current_question - 1
      this.question_data = this.current_session_data.quiz_data.questions[this.current_qn_index]
      this.qn_time_limit = this.current_session_data.quiz_data.questions[this.current_qn_index].time_limit
      this.startCountdown(this.qn_time_limit)
      this.isDataLoaded = true;
    });

    
  }

  answer1(){
    if(this.question_data.correct_answer == 1){
      this.points += 100;
      this.points += (this.counter / this.qn_time_limit) * 300
      this.points = Math.round(this.points)

      this.answer_outcome = true;
    }
    this.player_object.points += this.points
    this.player_answered = true;

    this.webSocketService.emit('player-answered',{'display_name': this.session_display_name, 'points': this.player_object.points, 'answer': 1,
     'answer_outcome': this.answer_outcome,'points_awarded': this.points, 
    'game_pin': this.game_pin})
    this.counter = 0;

    this.router.navigate(['/game/play/player-cycle/player-wait/' + this.game_pin],{queryParams: {'name': this.session_display_name}})


  }
  answer2(){
    if(this.question_data.correct_answer == 2){
      this.points += 100;
      this.points += (this.counter / this.qn_time_limit) * 300
      this.points = Math.round(this.points)

      this.answer_outcome = true;

    }
    this.player_object.points += this.points
    this.player_answered = true;

    this.webSocketService.emit('player-answered',{'display_name': this.session_display_name, 'points': this.player_object.points, 'answer': 2,
    'answer_outcome': this.answer_outcome,'points_awarded': this.points, 
   'game_pin': this.game_pin})
    this.counter = 0;

    this.router.navigate(['/game/play/player-cycle/player-wait/' + this.game_pin],{queryParams: {'name': this.session_display_name}})


  }
  answer3(){
    if(this.question_data.correct_answer == 3){
      this.points += 100;
      this.points += (this.counter / this.qn_time_limit) * 300
      this.points = Math.round(this.points)
      this.answer_outcome = true;

    }
    this.player_object.points += this.points
    this.player_answered = true;

    this.webSocketService.emit('player-answered',{'display_name': this.session_display_name, 'points': this.player_object.points, 'answer': 3,
    'answer_outcome': this.answer_outcome,'points_awarded': this.points, 
   'game_pin': this.game_pin})
    this.counter = 0;

    this.router.navigate(['/game/play/player-cycle/player-wait/' + this.game_pin],{queryParams: {'name': this.session_display_name}})


  }
  answer4(){
    if(this.question_data.correct_answer == 4){
      this.points += 100;
      this.points += (this.counter / this.qn_time_limit) * 300
      this.points = Math.round(this.points)

      this.answer_outcome = true;

    }
    this.player_object.points += this.points
    this.player_answered = true;
    this.webSocketService.emit('player-answered',{'display_name': this.session_display_name, 'points': this.player_object.points, 'answer': 4,
    'answer_outcome': this.answer_outcome,'points_awarded': this.points, 
   'game_pin': this.game_pin})
    this.counter = 0;
    this.router.navigate(['/game/play/player-cycle/player-wait/' + this.game_pin],{queryParams: {'name': this.session_display_name}})


  }
  startCountdown(seconds) {
    this.counter = seconds;

    var interval = setInterval(() => {
      this.counter--;


      if (this.counter == 0 && this.player_answered == false) {

        // The code here will run when
        // the timer has reached zero.

        this.answer1()

        clearInterval(interval);
      };
    }, 1000);
  };
  }


