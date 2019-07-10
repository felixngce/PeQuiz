import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { CoverComponent } from './cover/cover.component';
import { CoverContentComponent } from './cover-content/cover-content.component';
import { AuthenticationComponent } from './authentication/authentication.component';
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
import { QuizDescriptionComponent } from './main/quiz-description/quiz-description.component';
import { QuizDescriptionColumnComponent } from './main/quiz-description/quiz-description-column/quiz-description-column.component';
import { CreateQuizComponent } from './main/create-quiz/create-quiz.component';
import { CreateQuizColumnComponent } from './main/create-quiz/create-quiz-column/create-quiz-column.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    HomeComponent,
    CoverComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
