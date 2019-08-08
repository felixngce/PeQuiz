import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  game_pin;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.game_pin = this.route.snapshot.paramMap.get('id')


  }

  loopOrPodium(){
    this.router.navigate(['/game/play/podium/' + this.game_pin])
  }


}
