import { Component, OnInit } from '@angular/core';
import { UserGetService} from '../../../services/user/user-get.service';
import {ActivatedRoute} from'@angular/router'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-account-details-column',
  templateUrl: './account-details-column.component.html',
  styleUrls: ['./account-details-column.component.css']
})
export class AccountDetailsColumnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userGetService: UserGetService,public datepipe: DatePipe) { }

  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public afterFindingUser;
  public date;
  public latest_date;
  public pw_date;



  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.user_id = id;
    // Whenever any components change the service data with changeData(), it will auto update this.user_data
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.pw_date = this.datepipe.transform(this.user_data[0].last_pw_change,'dd-MM-yy hh:mm')
      this.latest_date = this.datepipe.transform(this.user_data[0].date_created, 'dd-MM-yy hh:mm');


      this.isDataLoaded = true; })

  }
  findUserById(){
    // Change service data under some condition
    this.userGetService.getUserById(this.user_id).subscribe(data => {

        this.userGetService.changeData(data)




      });
  }



}
