import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Define HttpHeaders with 'Content-Type' set to 'application/json'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) {
  }

  // Method to handle user login
  login(username: string, password: string): Observable<any> {
    // Construct the login URL with provided username and password
    const loginUrl = `https://localhost:7226/api/Authentication/login?username=${username}&password=${password}`;

    // Send a POST request to the login URL with the HttpHeaders
    return this.http.post<any>(loginUrl, { headers: this.headers });
  }
}
