import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>('./api/users');
  }

  getUserById(id) {
    console.log(id)
    return this.http.get<any[]>('./api/users/' + id)
  }

  updateUser(id, username: string
    , email: string
    , quiz_privacy: string) {
    return this.http.put<any[]>('./api/users/' + id, {
      'username': username,
      'email': email,
      'quiz_privacy': quiz_privacy


    });
  }

  updateUserPw(id, old_password: string, new_password: string) {
    return this.http.put<any[]>('./api/usersPw/' + id, {
      'old_password': old_password,
      'new_password': new_password

    });
  }




}
