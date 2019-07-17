import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserGetService } from '../../services/user/user-get.service'
import {ActivatedRoute} from'@angular/router'
import { HttpClientModule } from '@angular/common/http'; 





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {




  

  constructor(private authService: AuthService, private router:Router, private userGetService: UserGetService,private route: ActivatedRoute) { }

  user_object_id = this.authService.getSecureToken();
  public user_id;
  public user_data;


  logOut(){
    console.log("logout button actually working")
    
    this.authService.logout()
    this.router.navigateByUrl('/cover' )
  }

  routeToProfile(){
    this.router.navigate(["/main/profile",this.user_object_id])
  }

  routeToHome(){
    this.router.navigate(["/main/home",this.user_object_id])
  }



  ngOnInit() {
    console.log("This is the child compnent")


  }

}
