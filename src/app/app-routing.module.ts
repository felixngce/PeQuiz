import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { CoverComponent } from './cover/cover.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { CoverContentComponent } from './cover-content/cover-content.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';



import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { CreateQuizComponent } from './main/quiz/create-quiz/create-quiz.component'
import { ProfilePageComponent } from './main/profile-page/profile-page.component';
import { QuizDescriptionComponent } from './main/quiz/quiz-description/quiz-description.component';
import {QuizDetailsComponent} from './main/quiz/quiz-details/quiz-details.component'

import { GameComponent } from './game/game.component';
import { JoinComponent } from './game/join/join.component';
import { from } from 'rxjs';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';
import { HomeToCoverGuard } from './guards/home-to-cover.guard';
import { AuthService } from './services/auth.service';





export class testingClass  {
  constructor(private authService: AuthService) { }
 
    user_iddd = this.authService.getSecureToken()

 
 }

const routes: Routes = [

  

  {
    path: '',
   
    component: CoverComponent,
    canActivate: [HomeToCoverGuard],
    children: [
      { path: 'cover', component: CoverContentComponent },
      {
        path: 'authentication',
        component: AuthenticationComponent,

        children: [
          { path: 'login', component: LoginComponent },
          { path: 'sign-up', component: SignUpComponent },
          { path: 'forget-password', component: ForgetPasswordComponent }
        ],

      }
    ]


  },

  {
    path: 'main',
    component: MainComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'home/:id', component: HomeComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      {
        path: 'quiz',
        component: QuizComponent,

        children: [
          { path: 'create/:id', component: CreateQuizComponent },
          { path: 'description/:id', component: QuizDescriptionComponent },
          {path: 'details/:id', component: QuizDetailsComponent}



        ],
      }

    ]

  },


  {
    path: 'game',
    component: GameComponent,

    children: [
      { path: 'join', component: JoinComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [CoverComponent, AuthenticationComponent, LoginComponent, SignUpComponent, ForgetPasswordComponent, MainComponent, HomeComponent,
  ProfilePageComponent, CreateQuizComponent, QuizDescriptionComponent, GameComponent, JoinComponent]