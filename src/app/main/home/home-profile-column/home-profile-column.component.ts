import { Component, OnInit } from '@angular/core';
import { UserGetService } from '../../../services/user/user-get.service';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-profile-column',
  templateUrl: './home-profile-column.component.html',
  styleUrls: ['./home-profile-column.component.css']
})
export class HomeProfileColumnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userGetService: UserGetService, private authService: AuthService) { }

  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public afterFindingUser;
  public no_Quiz_Created;
  public pfpSrc;
  public totalQuizPlays = 0;
  public isLooped = false
  public id;
  public counter = 0;



  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.user_id = this.authService.getSecureToken()

      console.log(this.user_data);
      this.pfpSrc = "data:image/png;base64," + this.user_data[0].profile_picture;
      console.log(this.user_data[0])
      if (this.isLooped && this.counter == 0) {
        console.log(this.user_data[0].quiz_created.length)
        for (var i = 0; i < this.user_data[0].quiz_created.length; i++) {
          console.log('hi')
          if (this.user_data[0].quiz_created[i]) {
            this.totalQuizPlays += this.user_data[0].quiz_created[i].no_of_plays;
          }
        }
        this.counter += 1;
      }
      this.isLooped = true;
      this.isDataLoaded = true;



    });

    this.findUserById()


  }

  findUserById() {
    this.userGetService.getUserById(this.id).subscribe(data => {
      this.user_data = data;

      this.userGetService.changeData(this.user_data)

      this.isDataLoaded = true;



    });
  }



}
