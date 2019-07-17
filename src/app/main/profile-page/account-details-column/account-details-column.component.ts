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
        this.date= this.user_data[0].date_created
        this.latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd hh:mm');
        

        this.isDataLoaded = true;


      });
  }

}
