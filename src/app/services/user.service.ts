import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  userApi = "https://localhost:7226/User"
  
  constructor(private http:HttpClient) { }

  getAllUser():Observable<User[]> {
    return this.http.get<[]>(this.userApi,{headers:this.header});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`https://localhost:7226/api/Authentication/login?username=${username}&password=${password}`, { headers: this.header });
  }

  
}

