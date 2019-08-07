import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { CoverComponent } from './cover/cover.component';
import { CoverContentComponent } from './cover-content/cover-content.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ProfilePageComponent } from './main/profile-page/profile-page.component';
import { MainComponent } from './main/main.component';
import { ProfileColumnComponent } from './main/profile-page/profile-column/profile-column.component';
import { MyQuizColumnComponent } from './main/home/my-quiz-column/my-quiz-column.component';
import { FriendsQuizColumnComponent } from './main/home/friends-quiz-column/friends-quiz-column.component';
import { OnlineFriendsColumnComponent } from './main/home/online-friends-column/online-friends-column.component';
import { GameComponent } from './game/game.component';
import { JoinComponent } from './game/join/join.component';
import { PlayComponent } from './game/play/play.component';
import { HomeProfileColumnComponent } from './main/home/home-profile-column/home-profile-column.component';
import { AccountDetailsColumnComponent } from './main/profile-page/account-details-column/account-details-column.component';
import { QuizDescriptionComponent } from './main/quiz/quiz-description/quiz-description.component';
import { QuizDescriptionColumnComponent } from './main/quiz/quiz-description/quiz-description-column/quiz-description-column.component';
import { CreateQuizComponent } from './main/quiz/create-quiz/create-quiz.component';
import { CreateQuizColumnComponent } from './main/quiz/create-quiz/create-quiz-column/create-quiz-column.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { QuizDetailsComponent } from './main/quiz/quiz-details/quiz-details.component';
import { QuizDetailsColumnComponent } from './main/quiz/quiz-details/quiz-details-column/quiz-details-column.component';
import { AuthService } from './services/auth.service';
import {UserPostService} from './services/user/user-post.service'
import {UserGetService} from './services/user/user-get.service'


import {FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { HttpClientModule } from '@angular/common/http';
import { AddQuestionComponent } from './main/quiz/create-quiz/add-question/add-question.component';
import { HostComponent } from './game/play/host/host.component';
import { PlayerComponent } from './game/play/player/player.component';
import { LobbyComponent } from './game/play/player/lobby/lobby.component';
import { HostLobbyComponent } from './game/play/host/host-lobby/host-lobby.component';
import { PlayerCycleComponent } from './game/play/player-cycle/player-cycle.component';
import { PlayerQuestionComponent } from './game/play/player-cycle/player-question/player-question.component';
import { PlayerWaitComponent } from './game/play/player-cycle/player-wait/player-wait.component';
import { PlayerOutcomeComponent } from './game/play/player-cycle/player-outcome/player-outcome.component';
import { PlayerAwardComponent } from './game/play/player-award/player-award.component';
import { HostCycleComponent } from './game/play/host-cycle/host-cycle.component';
import { HostQuestionComponent } from './game/play/host-cycle/host-question/host-question.component';
import { InProgressComponent } from './game/play/host-cycle/host-answers/in-progress/in-progress.component';
import { QuestionDoneComponent } from './game/play/host-cycle/host-answers/question-done/question-done.component';
import { ScoreboardComponent } from './game/play/host-cycle/scoreboard/scoreboard.component';
import { HostAnswersComponent } from './game/play/host-cycle/host-answers/host-answers.component';
import { AnswerColumnComponent } from './game/play/host-cycle/host-answers/answer-column/answer-column.component';
import { PodiumComponent } from './game/play/podium/podium.component';
import { PlayerAnswerComponent } from './game/play/player-cycle/player-answer/player-answer.component';
import { PlayerDataBarComponent } from './game/play/player-cycle/player-data-bar/player-data-bar.component';
import { HostQuestionBarComponent } from './game/play/host-cycle/host-answers/host-question-bar/host-question-bar.component';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CoverComponent,
    SignUpComponent,
    CoverContentComponent,
    AuthenticationComponent,
    ForgetPasswordComponent,
    ProfilePageComponent,
    MainComponent,
    ProfileColumnComponent,
    MyQuizColumnComponent,
    FriendsQuizColumnComponent,
    OnlineFriendsColumnComponent,
    GameComponent,
    JoinComponent,
    PlayComponent,
    HomeProfileColumnComponent,
    AccountDetailsColumnComponent,
    QuizDescriptionComponent,
    QuizDescriptionColumnComponent,
    CreateQuizComponent,
    CreateQuizColumnComponent,
    QuizComponent,
    QuizDetailsComponent,
    QuizDetailsColumnComponent,
    AddQuestionComponent,
    HostComponent,
    PlayerComponent,
    LobbyComponent,
    HostLobbyComponent,
    PlayerCycleComponent,
    PlayerQuestionComponent,
    PlayerWaitComponent,
    PlayerOutcomeComponent,
    PlayerAwardComponent,
    HostCycleComponent,
    HostQuestionComponent,
    InProgressComponent,
    QuestionDoneComponent,
    ScoreboardComponent,
    HostAnswersComponent,
    AnswerColumnComponent,
    PodiumComponent,
    PlayerAnswerComponent,
    PlayerDataBarComponent,
    HostQuestionBarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService,
              DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
