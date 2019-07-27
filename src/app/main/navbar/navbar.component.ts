import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserGetService } from '../../services/user/user-get.service'
import {ActivatedRoute} from'@angular/router'
import { HttpClientModule } from '@angular/common/http'; 
import { QuizService } from 'src/app/services/quiz.service';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {




  

  constructor(private quizService: QuizService,private authService: AuthService, private router:Router, private userGetService: UserGetService,private route: ActivatedRoute,
     ) { }

  user_object_id = this.authService.getSecureToken();
  public user_id;
  public user_data;
  public isDataLoaded: Boolean = false;
  public pfpSrc;
  public pulledData;
  public validateCreateQuiz;
  resetDataTemplate = [
    {
      title : 'resetDataTemplate',
      description : null,
      questions: []
      


    }
  ]



  findUserById() { 
    this.userGetService.getUserById(this.user_object_id).subscribe(data => {
      this.user_data = data;



      this.isDataLoaded = true;


    });
  }




  logOut(){
    console.log("logout button actually working")
    localStorage.setItem('quizArray', JSON.stringify(this.resetDataTemplate));

    
    this.authService.logout()
    this.router.navigateByUrl('/cover' )
  }

  routeToProfile(){
    this.router.navigate(["/main/profile",this.pulledData[0]._id])
  }

  routeToHome(){
    this.router.navigate(["/main/home",this.user_object_id])
  }
  routeToCreate(){
    if(this.validateCreateQuiz == 'helloo'){
      this.quizService.changeCreateQuizData(this.resetDataTemplate)
      }
    this.router.navigate(["/main/quiz/create/overview"])
  }
  routeToQuizDesc(){
    this.router.navigate(["/main/quiz/desc/",this.pulledData[0]._id])
  }


  ngOnInit() {
    
    this.userGetService.currentUserData.subscribe(data => {
      this.pulledData = data;
      console.log("this is the pulled data")
      console.log(this.pulledData)

      this.pfpSrc = "data:image/png;base64," + this.pulledData[0].profile_picture;



    });

    this.quizService.currentCreateQuizData.subscribe(data => {
      this.validateCreateQuiz = data;
      console.log(data)

    })


    
  }

}
