import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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

    updateUsername(username: string, id
      // total_quizzes_created: number, last_password_change: Date, online_status: boolean, friends_list: string, created_quizzes: string
    ) {
        console.log("This is the service username")
        console.log(username)
      return this.http.put<any[]>('./api/users/' + id, {
        'username': username
        //  'last_password_change': last_password_change, 'online_status': online_status, 'friends_list': friends_list, 'created_quizzes': created_quizzes
      });
    }
}
