import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  registerUser(username: string, email: string, password: string
    // total_quizzes_created: number, last_password_change: Date, online_status: boolean, friends_list: string, created_quizzes: string
  ) {
    return this.http.post<any[]>('./api/users/', {
      'username': username, 'email': email, 'password': password
      //  'last_password_change': last_password_change, 'online_status': online_status, 'friends_list': friends_list, 'created_quizzes': created_quizzes
    });
  }

  authUser(username_or_email: string, password: string) {
    console.log("at service" + username_or_email)


    return this.http.post<any[]>('./api/authuser/', {
      'username_or_email': username_or_email,
      'password': password
    }
    
        );
  }

  setSecureToken(secure_token: string) {
    sessionStorage.setItem("LoggedIn", secure_token)
    console.log(sessionStorage);
    }
   
    getSecureToken() {
    return sessionStorage .getItem("LoggedIn")
    }
   
    setUserRole(role: string) {
    sessionStorage .setItem("UserRole", role);
    }
   

    logout() {
    sessionStorage.removeItem("LoggedIn");
    console.log(sessionStorage);
    }
   

}
