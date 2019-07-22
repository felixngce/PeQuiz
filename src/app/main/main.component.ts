import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetService } from '../services/user/user-get.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor(private router: Router, private userGetService: UserGetService, private authService: AuthService) { }

  public user_id;
  public user_data;

  ngOnInit() {
    
    
      // this.router.navigate(['/main/home']);
      this.user_id = this.authService.getSecureToken()

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
