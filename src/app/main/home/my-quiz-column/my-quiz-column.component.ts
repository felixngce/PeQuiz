import { Component, OnInit } from '@angular/core';
import { UserGetService } from 'src/app/services/user/user-get.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-quiz-column',
  templateUrl: './my-quiz-column.component.html',
  styleUrls: ['./my-quiz-column.component.css']
})
export class MyQuizColumnComponent implements OnInit {

  public user_data;
  public user_id;

  constructor(private router:Router,private userGetService: UserGetService, private authService: AuthService) { }

  ngOnInit() {
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.user_id = this.authService.getSecureToken()
      console.log("this is the pulled data from my-quiz")

      console.log(this.user_data)




    });
    this.findUserById()


  }

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        console.log("This is the user data sent to service")
        console.log(this.user_data);

        console.log("This is me changing the service data!")
        this.userGetService.changeData(this.user_data)




      });
  }

}
