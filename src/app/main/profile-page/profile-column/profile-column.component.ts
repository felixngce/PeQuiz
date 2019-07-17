import { Component, OnInit } from '@angular/core';
import { UserGetService} from '../../../services/user/user-get.service';
import {ActivatedRoute} from'@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserPostService } from '../../../services/user/user-post.service';


@Component({
  selector: 'app-profile-column',
  templateUrl: './profile-column.component.html',
  styleUrls: ['./profile-column.component.css']
})
export class ProfileColumnComponent implements OnInit {

  usernameForm: FormGroup

  constructor(private route: ActivatedRoute, private userGetService: UserGetService,  private fb : FormBuilder) { }


  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public updateUserDone: Boolean = false;
  public afterFindingUser;

  ngOnInit() {

    this.usernameForm = this.fb.group({
      new_username: ''


      });


    let id = this.route.snapshot.paramMap.get('id');

    this.user_id = id;

    this.findUserById()
  }

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        console.log(this.user_data);
        console.log(this.user_data[0].username)

        this.isDataLoaded = true;


      });
  }

  onUpdateUsername(){

    this.userGetService.updateUsername(this.usernameForm.value.new_username, this.user_id
      ).subscribe(results => {
       this.findUserById()
       });
       this.updateUserDone =  true;

  }

}
