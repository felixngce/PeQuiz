import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
 providedIn: 'root'
})
export class UserPostService {
 constructor(private http:HttpClient) { }

 getAllPosts() {
 return this.http.get<any[]>('./api/posts');
 }

 insertQuote (name: string, newquote: number) {
 return this.http.post<any[]>('./api/quotes/', {'name': name, 'quote':
newquote });
 }
}