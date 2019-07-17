import { Component, OnInit } from '@angular/core';
import { UserGetService} from '../../../services/user/user-get.service';
import {ActivatedRoute} from'@angular/router'

@Component({
  selector: 'app-profile-column',
  templateUrl: './profile-column.component.html',
  styleUrls: ['./profile-column.component.css']
})
export class ProfileColumnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userGetService: UserGetService) { }


  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public afterFindingUser;

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    console.log("This is the child compnent")

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

}
