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
  public pfpSrc;
  public totalQuizPlays = 0;
  public isLooped = false
  


  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.pfpSrc = "data:image/png;base64," + this.user_data[0].profile_picture;
      if (!this.isLooped) {
        for(var i = 0;i < this.user_data[0].quiz_created.length;i++){
          this.totalQuizPlays += this.user_data[0].quiz_created[i].no_of_plays
        }
      }
      this.isLooped = true;
      this.isDataLoaded = true;



    });

    

    
  }



}
