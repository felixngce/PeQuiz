import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetService } from 'src/app/services/user/user-get.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  public user_data;
  public user_id;
  
  

  constructor(private userGetService: UserGetService,private authService: AuthService,private router: Router) { }

  ngOnInit() {

    this.user_id = this.authService.getSecureToken()
    console.log(this.user_id)

    this.findUserById()
  }

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;

        console.log(this.user_data);

        this.userGetService.changeData(this.user_data)




      });
  }

  routeToHome(){
    console.log("hi")
    this.router.navigate(["/main/home/" + this.user_id])
  }

}
