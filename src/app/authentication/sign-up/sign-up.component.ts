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

  myForm: FormGroup;


  constructor(private userPostService: UserPostService, private fb : FormBuilder) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      username: '',
      email_address: '',
      password:''
      });
  }

  onSubmit(){
    
    this.userPostService.insertUserData(this.myForm.value.username,
   this.myForm.value.email_address, this.myForm.value.password).subscribe(results => {
    location.reload();
    });
    
    }
   

}
