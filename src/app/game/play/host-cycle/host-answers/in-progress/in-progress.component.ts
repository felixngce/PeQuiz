import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements OnInit {
  public counter;

  constructor() { }

  ngOnInit() {
    this.startCountdown(20)
  }
  startCountdown(seconds) {
    this.counter = seconds;

    var interval = setInterval(() => {
      console.log(this.counter);
      console.log("hi")
      this.counter--;


      if (this.counter == 0) {

        // The code here will run when
        // the timer has reached zero.

        clearInterval(interval);

        
      };
    }, 1000);
  };

}
