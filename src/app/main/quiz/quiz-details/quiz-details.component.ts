import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetService } from 'src/app/services/user/user-get.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {

  public user_data;
  public user_id;
  public array_id;
  public isDataLoaded = false;
  public updateQuizArray;

  constructor(private route: ActivatedRoute,private router:Router,private userGetService: UserGetService, private authService: AuthService) { }

  ngOnInit() {
    this.array_id = this.route.snapshot.paramMap.get('id');
    this.userGetService.currentUserData.subscribe(data => {
      this.user_data = data;
      this.user_id = this.authService.getSecureToken()





    });

    this.findUserById()
    
  }


  findUserById(){
    this.userGetService.getUserById(this.user_id).subscribe(data => {
        this.user_data = data;

        this.userGetService.changeData(this.user_data)


      this.isDataLoaded = true;

      });
  }

  deleteQuiz(index){
    this.router.navigate(["main/quiz/desc/" + this.user_id])
    this.user_data[0].quiz_created.splice(index, 1)
    this.updateQuizArray = this.user_data[0].quiz_created
    this.userGetService.deleteQuiz(this.user_id, this.updateQuizArray).subscribe(results => {
      this.findUserById()


    });
  }

}
