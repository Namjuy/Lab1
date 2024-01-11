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

  userApi = "https://localhost:7233/api/User"
  
  constructor(private http:HttpClient) { }

  getAllUser():Observable<User[]> {
    return this.http.get<[]>(this.userApi,{headers:this.header});
  }


}

