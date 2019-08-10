import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-host-question-bar',
  templateUrl: './host-question-bar.component.html',
  styleUrls: ['./host-question-bar.component.css']
})
export class HostQuestionBarComponent implements OnInit {
  current_session_data;
  isDataLoaded :Boolean = false;
  current_qn_index;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {

    this.webSocketService.currentSessionData.subscribe(data => {
      this.current_session_data = data;
      this.current_qn_index = this.current_session_data.current_question - 1
      this.isDataLoaded = true;
    });
  }

}
