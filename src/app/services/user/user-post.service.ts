import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
 providedIn: 'root'
})
export class UserPostService {
 constructor(private http:HttpClient) { }

 getAllPosts() {
 return this.http.get<any[]>('./api/posts');
 }

 registerUser (username: string,email: string, password: string
  // total_quizzes_created: number, last_password_change: Date, online_status: boolean, friends_list: string, created_quizzes: string
  ) {
    console.log(username);
  return this.http.post<any[]>('./api/users/', {'username': username, 'email': email, 'password': password
  //  'total_quizzes_created': total_quizzes_created,'last_password_change': last_password_change, 'online_status': online_status, 'friends_list': friends_list, 'created_quizzes': created_quizzes
  });
  } 
}