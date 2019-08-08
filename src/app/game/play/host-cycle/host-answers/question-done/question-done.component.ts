import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-done',
  templateUrl: './question-done.component.html',
  styleUrls: ['./question-done.component.css']
})
export class QuestionDoneComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  blueHeight = 90;
  game_pin;

  //Max-height 300px, normal 50px

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id')
  }

  routeToScoreboard(){
    this.router.navigate(['/game/play/host-cycle/scoreboard/' + this.game_pin])
  }

}
