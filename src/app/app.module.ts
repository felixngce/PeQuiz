import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './main/home/home.component';
import { CoverComponent } from './cover/cover.component';
import { CoverContentComponent } from './cover-content/cover-content.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { ProfilePageComponent } from './main/profile-page/profile-page.component';
import { MainComponent } from './main/main.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
