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
}
