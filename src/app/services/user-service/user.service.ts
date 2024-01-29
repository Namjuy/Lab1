// Import necessary modules from Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

// Declare the Injectable decorator for the service
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Define HttpHeaders with 'Content-Type' set to 'application/json'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // API endpoint for user-related operations
  private userApi = 'https://localhost:7226/User';

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) {}

  // Method to fetch all users
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userApi, { headers: this.headers });
  }

  // Method to search for users based on specified criteria
  searchUser(
    input: string,
    type: string,
    startDate?: string,
    endDate?: string,
    gender?: number
  ): Observable<User[]> {
    // Construct the base URL
    let url = `${this.userApi}/search?`;

    // Append query parameters based on provided input
    if (input) url += `input=${input}&`;
    if (type) url += `type=${type}&`;
    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;
    if (gender !== undefined) url += `gender=${gender}&`;

    // Send a GET request to the constructed URL with the HttpHeaders
    return this.http.get<User[]>(url, { headers: this.headers });
  }

  // Method to create a new user
  createUser(newUser: any): Observable<any> {
    return this.http.post<any>(this.userApi, newUser, { headers: this.headers });
  }

  // Method to update an existing user
  updateUser(userId: string, updatedUserData: any): Observable<User> {
    const url = `${this.userApi}/${userId}`;

    return this.http.put<User>(url, updatedUserData, { headers: this.headers });
  }

  deleteUser(userId:string):Observable<any>{
    const url = `${this.userApi}/${userId}`;
    return this.http.put<User>(url, userId, {headers:this.headers});
  }

  // Custom validator function for validating phone numbers
  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumberRegex = /^\d{10}$/;
      const value = control.value;

      if (!value) return null;

      if (!phoneNumberRegex.test(value)) return { invalidPhoneNumber: true };

      return null;
    };
  }

  // Custom validator function for validating age
  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age <= 18) return { invalidAge: true };

      return null;
    };
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  
}
