import { Component, OnInit } from '@angular/core';
import { UserGetService} from '../../../services/user/user-get.service';
import {ActivatedRoute} from'@angular/router'

@Component({
  selector: 'app-home-profile-column',
  templateUrl: './home-profile-column.component.html',
  styleUrls: ['./home-profile-column.component.css']
})
export class HomeProfileColumnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userGetService: UserGetService) { }

  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public afterFindingUser;
  public no_Quiz_Created;

  


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("This is the child compnent")

    this.user_id = id;

      // this.afterFindingUser = new Promise(function(resolve, reject){
      //   this.findUserById()
      //   console.log(this.user_data)
      //   resolve()
      // });

      // this.afterFindingUser.then(this.isDataLoaded = true);

      this.findUserById()
    

    
  }

  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;
        console.log(this.user_data);
        console.log(this.user_data[0].username)
        console.log(this.user_data.username)
        console.log(this.user_id);
        console.log(this.user_data[0].quiz_created)
        console.log(this.user_data[0].quiz_created.length)
        this.no_Quiz_Created = this.user_data[0].quiz_created.length
        console.log(this.no_Quiz_Created);
        this.isDataLoaded = true;


      });
  }

}
