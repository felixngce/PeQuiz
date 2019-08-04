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
import { QuizDetailsComponent } from './main/quiz/quiz-details/quiz-details.component'
import { AddQuestionComponent } from './main/quiz/create-quiz/add-question/add-question.component'
import { CreateQuizColumnComponent } from './main/quiz/create-quiz/create-quiz-column/create-quiz-column.component'

import { GameComponent } from './game/game.component';
import { JoinComponent } from './game/join/join.component';
import { from } from 'rxjs';
import { PlayComponent } from './game/play/play.component'
import { HostComponent } from './game/play/host/host.component'
import { HostLobbyComponent } from './game/play/host/host-lobby/host-lobby.component'
import { LobbyComponent } from './game/play/player/lobby/lobby.component'
import { PodiumComponent} from './game/play/podium/podium.component'
import { PlayerAwardComponent} from './game/play/player-award/player-award.component'


import { HostCycleComponent} from './game/play/host-cycle/host-cycle.component'
import { HostAnswersComponent} from './game/play/host-cycle/host-answers/host-answers.component'
import { AnswerColumnComponent} from './game/play/host-cycle/host-answers/answer-column/answer-column.component'
import { InProgressComponent} from './game/play/host-cycle/host-answers/in-progress/in-progress.component'
import { QuestionDoneComponent} from './game/play/host-cycle/host-answers/question-done/question-done.component'
import { HostQuestionComponent} from './game/play/host-cycle/host-question/host-question.component'
import { ScoreboardComponent} from './game/play/host-cycle/scoreboard/scoreboard.component'







import {PlayerCycleComponent} from './game/play/player-cycle/player-cycle.component'
import {PlayerOutcomeComponent} from './game/play/player-cycle/player-outcome/player-outcome.component'
import {PlayerQuestionComponent} from './game/play/player-cycle/player-question/player-question.component'
import {PlayerWaitComponent} from './game/play/player-cycle/player-wait/player-wait.component'



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HomeToCoverGuard } from './guards/home-to-cover.guard';
import { AuthService } from './services/auth.service';
import { PlayerComponent } from './game/play/player/player.component';





export class testingClass {
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
    canActivate: [AuthGuard],
    children: [
      { path: 'home/:id', component: HomeComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      {
        path: 'quiz',
        component: QuizComponent,

        children: [
          {
            path: 'create', component: CreateQuizComponent,
            children: [
              { path: 'overview', component: CreateQuizColumnComponent },
              { path: 'question/:id', component: AddQuestionComponent }
            ]
          },
          { path: 'desc/:id', component: QuizDescriptionComponent },
          { path: 'details/:id', component: QuizDetailsComponent }



        ],
      }

    ]

  },


  {
    path: 'game',
    component: GameComponent,

    children: [
      { path: 'join', component: JoinComponent },
      {
        path: 'play', component: PlayComponent,
        children: [
          {path: 'player-award', component: PlayerAwardComponent},
          {path: 'podium', component: PodiumComponent},{
            path: 'host-cycle', component: HostCycleComponent, children: [
              {path: 'host-answers', component: HostAnswersComponent, children: [
                {path: 'in-progress/:id', component: InProgressComponent},
                {path: 'chart/:id', component: QuestionDoneComponent}
              ]},
              {path: 'host-question/:id', component: HostQuestionComponent},
              {path: 'scoreboard/:id', component: ScoreboardComponent}
            ]},
            {path: 'player-cycle', component: PlayerCycleComponent, children: [
              {path: 'player-outcome/:id', component: PlayerOutcomeComponent},
              {path: 'player-wait/:id', component: PlayerWaitComponent},
              {path:'player-question/:id', component: PlayerQuestionComponent}
            ]},
            {
            path: 'host', component: HostComponent, children: [
              { path: 'lobby', component: HostLobbyComponent }
            ]
          },
          {path: 'player', component: PlayerComponent, children: [
            { path: 'lobby/:id', component: LobbyComponent}
          ]}
        ]
      }
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