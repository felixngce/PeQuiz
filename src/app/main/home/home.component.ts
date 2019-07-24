import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserGetService} from '../../services/user/user-get.service';
import {ActivatedRoute, Router} from'@angular/router'
import { HttpClientModule } from '@angular/common/http'; 



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_id;
  public user_data;
  

  constructor(private route: ActivatedRoute, private router:Router, private userGetService: UserGetService, private authService: AuthService) { }

  ngOnInit() {
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      console.log("this is the pulled data")
      console.log(this.user_data)
    });


   
  }

  routeToCreate(){
    console.log(this.user_data[0]._id)
    this.router.navigate(["/main/quiz/create/overview"])
    console.log(this.user_data[0]._id)

    console.log("Function going off")

  }


  




}
