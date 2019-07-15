import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPostService } from '../../services/user/user-post.service';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  

  constructor() { }

  ngOnInit() {
  }

}
