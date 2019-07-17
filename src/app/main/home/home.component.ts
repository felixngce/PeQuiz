import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserGetService} from '../../services/user/user-get.service';
import {ActivatedRoute} from'@angular/router'
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user_id;
  public user_data;
  

  constructor(private route: ActivatedRoute, private userGetService: UserGetService, private authService: AuthService) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.user_id = id;
    console.log("this is the home token")

    console.log(this.authService.getSecureToken);


    this.findUserById();
  }


  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        console.log(this.user_data);
        console.log(this.user_id);


      });
  }




}
