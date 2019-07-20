import { Component, OnInit } from '@angular/core';
import { UserGetService } from '../../../services/user/user-get.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserPostService } from '../../../services/user/user-post.service';


@Component({
  selector: 'app-profile-column',
  templateUrl: './profile-column.component.html',
  styleUrls: ['./profile-column.component.css']
})
export class ProfileColumnComponent implements OnInit {

  usernameForm: FormGroup
  emailForm: FormGroup

  constructor(private route: ActivatedRoute, private userGetService: UserGetService, private fb: FormBuilder) { }


  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public updateUserDone: Boolean = false;
  public updateEmailDone: Boolean = false;

  public afterFindingUser;

  ngOnInit() {

    this.usernameForm = this.fb.group({
      new_username: '',
  

    });

    this.emailForm = this.fb.group({

      new_email: ''

    });


    let id = this.route.snapshot.paramMap.get('id');

    this.user_id = id;

    this.findUserById()
  }

  findUserById() {
    this.userGetService.getUserById(this.user_id).subscribe(data => {
      this.user_data = data;
      console.log(this.user_data);
      console.log(this.user_data[0].username)

      this.isDataLoaded = true;


    });
  }

  onUpdateUsername() {

    this.userGetService.updateUser( this.user_id,this.usernameForm.value.new_username, this.user_data[0].email
    ).subscribe(results => {
      this.findUserById()
    });
    this.updateUserDone = true;


  }

  onUpdateEmail(){

    this.userGetService.updateUser( this.user_id,this.user_data[0].username, this.emailForm.value.new_email
      ).subscribe(results => {
        this.findUserById()
      });
      this.updateUserDone = true;

  }


}
