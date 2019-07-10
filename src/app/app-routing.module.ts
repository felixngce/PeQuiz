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
import {CreateQuizComponent} from './main/create-quiz/create-quiz.component'
import { ProfilePageComponent } from './main/profile-page/profile-page.component';
import {QuizDescriptionComponent} from './main/quiz-description/quiz-description.component';

import { GameComponent } from './game/game.component';
import { JoinComponent } from './game/join/join.component';

const routes: Routes = [

  {
    path: '',
    component: CoverComponent,
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
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile-page', component: ProfilePageComponent },
      { path: 'create-quiz', component: CreateQuizComponent},
      {path: 'quiz-description', component: QuizDescriptionComponent},
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CoverComponent, AuthenticationComponent, LoginComponent, SignUpComponent, ForgetPasswordComponent, MainComponent, HomeComponent,
  ProfilePageComponent,CreateQuizComponent,QuizDescriptionComponent, GameComponent, JoinComponent]