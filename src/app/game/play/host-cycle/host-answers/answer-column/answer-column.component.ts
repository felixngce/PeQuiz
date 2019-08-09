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
  public current_qn_index

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.current_qn_index = this.current_session_data.current_question - 1

      this.isDataLoaded = true;
      // this.player_object = this.session_data.player.find(player => player.display_name === this.session_display_name)
      // console.log(this.player_object)


    });

  }
}
