import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-answer-column',
  templateUrl: './answer-column.component.html',
  styleUrls: ['./answer-column.component.css']
})
export class AnswerColumnComponent implements OnInit {

  public current_session_data;
  public isDataLoaded;
  public current_qn_index;
  public question_data;
  public redOpacity = 1.0;
  public blueOpacity = 1.0;
  public greenOpacity = 1.0;
  public orangeOpacity = 1.0;


  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.current_qn_index = this.current_session_data.current_question - 1
      this.question_data = this.current_session_data.quiz_data.questions[this.current_qn_index]


      this.isDataLoaded = true;
      // this.player_object = this.session_data.player.find(player => player.display_name === this.session_display_name)
      // console.log(this.player_object)
      this.webSocketService.listen('show-correct-answer').subscribe((data) => {
      if(this.question_data.correct_answer != 1){
        this.redOpacity = 0.3;
      }
      if(this.question_data.correct_answer != 2){
        this.blueOpacity = 0.3;

      }
      if(this.question_data.correct_answer != 3){
        this.greenOpacity = 0.3;

      }
      if(this.question_data.correct_answer != 4){
        this.orangeOpacity = 0.3;

      }

      })

    });

  }
}
