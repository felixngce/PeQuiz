import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //If user is logged in, guard= true for MainComponent, and also redirect
    if (this.authService.isLoggedIn()) {

      console.log("this is indeed logged in!")
      return true;


    }
    else{
      console.log("if this is " + !this.authService.isLoggedIn());
      console.log("this is suppose to redirect me to cover!");

      this.router.navigate(["/cover"]);
      return false;
      


    }
    

    

  }

}
