import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private http: HttpClient) { }



  ngOnInit(){

  }

  registerUser(username: string, email: string, password: string
    // total_quizzes_created: number, last_password_change: Date, online_status: boolean, friends_list: string, created_quizzes: string
  ) {

    return this.http.post<any[]>(environment.apiBaseUrl + '/api/users/', {
      'username': username, 'email': email, 'password': password
      //  'last_password_change': last_password_change, 'online_status': online_status, 'friends_list': friends_list, 'created_quizzes': created_quizzes
    });
  }

  authUser(username_or_email: string, password: string) {

    return this.http.post<any[]>(environment.apiBaseUrl + '/api/authuser/', {
      'username_or_email': username_or_email,
      'password': password
    }

        );
  }

  setSecureToken(secure_token: string) {
    sessionStorage.setItem("LoggedIn", secure_token)
    }

    getSecureToken() {

    return sessionStorage .getItem("LoggedIn")

    }



    logout() {
    sessionStorage.removeItem("LoggedIn");

    }

    isLoggedIn() {
      return this.getSecureToken() !== null;
      }

      user_object_id = sessionStorage. getItem("LoggedIn");






}
