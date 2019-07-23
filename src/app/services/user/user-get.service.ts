import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


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
      quiz_created: [],
      quiz_privacy: null,
      username: null,
      _id: null


    }


  ]

  private central_user_data = new BehaviorSubject(this.dataPlaceHolder);
  currentUserData = this.central_user_data.asObservable();

  changeData(user_data) {
    this.central_user_data.next(user_data)
    console.log(this.currentUserData)
  }

  getAllUsers() {
    return this.http.get<any[]>('http://localhost:3000/api/users');
  }

  getUserById(id) {
    console.log(id) 
    return this.http.get<any[]>('http://localhost:3000/api/users/' + id)
  }

  updateUser(id, username: string
    , email: string
    , quiz_privacy: string) {

    return this.http.put<any[]>('http://localhost:3000/api/users/' + id, {
      'username': username,
      'email': email,
      'quiz_privacy': quiz_privacy


    });
  }

  updateUserPw(id, old_password: string, new_password: string) {
    return this.http.put<any[]>('http://localhost:3000/api/usersPw/' + id, {
      'old_password': old_password,
      'new_password': new_password
      

    });
    
  }

  updateUserPfp(id, profile_picture){
    console.log("this is the profile picture")
    console.log(profile_picture)
    return this.http.post<any[]>('http://localhost:3000/api/userPfp/' + id,
      profile_picture
    );
  }

  deleteUserAcc(id){
    return this.http.post<any[]>('http://localhost:3000/api/delUser/' + id, {

    });
      
    

  }




}
