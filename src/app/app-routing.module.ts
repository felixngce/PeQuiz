import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CoverComponent } from './cover/cover.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoverContentComponent } from './cover-content/cover-content.component';

const routes: Routes = [
  
  {
    path: '', 
    component:CoverComponent,
    children: [
      {path: 'cover', component: CoverContentComponent},
      {
        path: 'authentication',
        component: LoginComponent,
        children: [
          {path: 'login', component:LoginComponent},
          {path: 'sign-up', component:SignUpComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [CoverComponent,LoginComponent,SignUpComponent]