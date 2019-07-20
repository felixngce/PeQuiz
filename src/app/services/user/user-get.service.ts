import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {

  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>('./api/users');
    }

    getUserById(id){
      console.log(id)
      return this.http.get<any[]>('./api/users/' + id)
    }

    updateUser(id, username: string
      , email: string
      // , quiz_privacy: string, password: string
      )
      // total_quizzes_created: number, last_password_change: Date, online_status: boolean, friends_list: string, created_quizzes: string
     {
        console.log("This is the service username")
        console.log(username)
      return this.http.put<any[]>('./api/users/' + id, {
        'username': username,
        'email' : email,
        // 'quiz_privacy' : quiz_privacy,
        // 'password' : password


      });
    }

    


}
