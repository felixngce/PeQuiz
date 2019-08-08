import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  routeToHome(){
    this.router.navigate(['/cover'])

  }

}
