import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPostService } from '../../services/user/user-post.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  results: any = false;
  loginFailed: Boolean = false;




  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  

  ngOnInit() {

    this.loginForm = this.fb.group({
      username_or_email: '',
      password: ''

    });
  }

  onLogin() {
    this.loginFailed = false;
    this.authService.authUser(this.loginForm.value.username_or_email,
      this.loginForm.value.password).subscribe(data => {
        this.results = data;
        if (this.results[0].auth) {
          this.authService.setSecureToken(this.results[1].obj_id);
          var user_id = this.results[1].obj_id;
          this.router.navigate(['/main/home', user_id]);
        } else{
          this.loginFailed = true;
        }
      });
  }
}


