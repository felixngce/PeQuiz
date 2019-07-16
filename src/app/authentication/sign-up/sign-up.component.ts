import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPostService } from '../../services/user/user-post.service';
import {AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;


  constructor(private userPostService: UserPostService,private authService: AuthService, private fb : FormBuilder) { }


  ngOnInit() {

    this.signUpForm = this.fb.group({
      username: '',
      email_address: '',
      password:''

      });
  }

  onSignUp(){
    
    this.authService.registerUser(this.signUpForm.value.username,
   this.signUpForm.value.email_address, this.signUpForm.value.password).subscribe(results => {
    location.reload();
    });
    
    }
   

}
