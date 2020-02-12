import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserGetService {

  constructor(private http: HttpClient) { }


  dataPlaceHolder = [
    {
      date_created : null,
      email : null,
      friends: [],
      last_pw_change: null,
      password: null,
      profile_picture: null,
      quiz_created: [null],
      quiz_privacy: null,
      username: null,
      _id: null


    }


  ]

  private central_user_data = new BehaviorSubject(this.dataPlaceHolder);
  currentUserData = this.central_user_data.asObservable();

  changeData(user_data) {
    this.central_user_data.next(user_data)
  }

  getAllUsers() {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/users');
  }

  getUserById(id) {
    return this.http.get<any[]>(environment.apiBaseUrl + '/api/users/' + id)
  }

  updateUser(id, username: string
    , email: string
    , quiz_privacy: string) {

    return this.http.put<any[]>(environment.apiBaseUrl + '/api/users/' + id, {
      'username': username,
      'email': email,
      'quiz_privacy': quiz_privacy


    });
  }

  updateUserPw(id, old_password: string, new_password: string) {
    return this.http.put<any[]>(environment.apiBaseUrl + '/api/usersPw/' + id, {
      'old_password': old_password,
      'new_password': new_password


    });

  }

  updateUserPfp(id, profile_picture){
    return this.http.post<any[]>(environment.apiBaseUrl + '/api/userPfp/' + id,
      profile_picture
    );
  }

  deleteUserAcc(id){
    return this.http.post<any[]>(environment.apiBaseUrl + '/api/delUser/' + id, {

    });

  }

  deleteQuiz(id, quiz_array){

    return this.http.put<any[]>(environment.apiBaseUrl + '/api/deleteQuiz/' + id, {
      'quiz_array' : quiz_array


    });

  }




}
