import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {




  

  constructor(private authService: AuthService, private router:Router) { }

  user_obejct_id = this.authService.user_object_id;

  logOut(){
    console.log("logout button actually working")
    
    this.authService.logout()
    this.router.navigateByUrl('/cover' )
  }

  routeToProfile(){
    this.router.navigate(["/main/profile",this.user_obejct_id])
  }

  routeToHome(){
    this.router.navigate(["/main/home",this.user_obejct_id])
  }

  ngOnInit() {
  }

}
