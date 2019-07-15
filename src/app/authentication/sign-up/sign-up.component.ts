import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPostService } from '../../services/user/user-post.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;


  constructor(private userPostService: UserPostService, private fb : FormBuilder) { }

  password_salt: 'salt_example';
  pfp_placeholder: 'http://localhost:3000/assets/images/pfp_placeholder.png';

  ngOnInit() {

    this.signUpForm = this.fb.group({
      username: '',
      email_address: '',

      password:''

      });
  }

  onSignUp(){
    
    this.userPostService.registerUser(this.signUpForm.value.username,
   this.signUpForm.value.email_address, this.signUpForm.value.password).subscribe(results => {
    location.reload();
    });
    
    }
   

}
