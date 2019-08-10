import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-question-done',
  templateUrl: './question-done.component.html',
  styleUrls: ['./question-done.component.css']
})
export class QuestionDoneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private webSocketService: WebSocketService) { }


  redHeight = 15;
  blueHeight = 15;
  greenHeight = 15;
  orangeHeight = 15;
  public current_session_data;
  public chart_data;
  public current_qn_index;
  public isDataLoaded;
  public player;
  public game_pin;
  public total_players = 0;

  //Max-height 300px, normal 50px

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id');

    this.webSocketService.getChartArray.subscribe(data => {
      this.chart_data = data;
      

      for(var i = 0; i < this.chart_data.length; i++){
        this.total_players += this.chart_data[i]
      }
      this.redHeight += (this.chart_data[0] / this.total_players) * 85
      this.blueHeight += (this.chart_data[1] / this.total_players) * 85
      this.greenHeight += (this.chart_data[2] / this.total_players) * 85
      this.orangeHeight += (this.chart_data[3] / this.total_players) * 85
      this.isDataLoaded = true;


    });





  }

  routeToScoreboard(){
    this.webSocketService.updateChartData([null])
    this.router.navigate(['/game/play/host-cycle/scoreboard/' + this.game_pin])
  }

}
