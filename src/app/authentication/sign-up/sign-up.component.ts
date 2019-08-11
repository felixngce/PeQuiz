import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPostService } from '../../services/user/user-post.service';
import {AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;


  constructor(private userPostService: UserPostService,private authService: AuthService, private fb : FormBuilder,  private router: Router) { }
  emailEmpty: Boolean = false;
  usernameEmpty: Boolean = false;
  passwordEmpty: Boolean = false;

  reEnterPwEmpty: Boolean = false;

  pwNotMatching: Boolean = false;
  pwShortChar: Boolean = false;



  ngOnInit() {

    this.signUpForm = this.fb.group({
      username: '',
      email_address: '',
      password:'',
      reEnterPw:''

      });

      
  }

  onSignUp(){

    this.emailEmpty = false;
    this.usernameEmpty = false;
    this.passwordEmpty = false;
  
    this.reEnterPwEmpty = false;
  
    this.pwNotMatching = false;
    this.pwShortChar = false;
    if(this.signUpForm.value.email_address.length == 0){
      this.emailEmpty = true;
    }    
    else if(this.signUpForm.value.username.length == 0){
      this.usernameEmpty = true;
    }
    else if(this.signUpForm.value.password.length == 0){
      this.passwordEmpty = true;
    }
    else if(this.signUpForm.value.password.length < 8){
      this.pwShortChar = true;
    }
    else if(this.signUpForm.value.reEnterPw.length == 0){
      this.reEnterPwEmpty = true;
    }
    else if(this.signUpForm.value.password != this.signUpForm.value.reEnterPw){
      this.pwNotMatching = true;
    }
    else{
      this.authService.registerUser(this.signUpForm.value.username,
        this.signUpForm.value.email_address, this.signUpForm.value.password).subscribe(results => {
          
         this.router.navigate(['/authentication/login']);
         });
      
    }
    }

}
