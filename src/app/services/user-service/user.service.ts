import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  // 10.1.21.114:1234
  private userApi = 'http://localhost:5086/User';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getAllUser: () => Observable<User[]> = () =>
    this.http.get<User[]>(this.userApi, { headers: this.headers });

  // Search for users based on specified criteria
  searchUser: (
    input: string,
    type: string,
    startDate?: string,
    endDate?: string,
    gender?: number
  ) => Observable<User[]> = (input, type, startDate, endDate, gender) => {
    let url = `${this.userApi}/search?`;

    if (input) url += `input=${input}&`;
    if (type) url += `type=${type}&`;
    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;
    if (gender !== undefined) url += `gender=${gender}&`;

    return this.http.get<User[]>(url, { headers: this.headers });
  };

  // Create a new user
  createUser: (newUser: any) => Observable<any> = (newUser) =>
    this.http.post<any>(this.userApi, newUser, { headers: this.headers });

  // Update an existing user
  updateUser: (userId: string, updatedUserData: any) => Observable<User> = (
    userId,
    updatedUserData
  ) => {
    const url = `${this.userApi}/${userId}`;
    return this.http.put<User>(url, updatedUserData, { headers: this.headers });
  };

  // Delete a user
  deleteUser: (userId: string) => Observable<any> = (userId) => {
    const url = `${this.userApi}/ban/${userId}`;
    return this.http.put(url, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  };

  // Change user password
  changePassword: (
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Observable<any> = (
    userId,
    oldPassword,
    newPassword,
    confirmPassword
  ) => {
    const url = `${this.userApi}/changePassword/${userId}?oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`;
    return this.http.put(url, { newPassword }, { headers: this.headers });
  };

  // Custom validator function for validating phone numbers
  phoneNumberValidator: () => ValidatorFn = () => (control) => {
    const phoneNumberRegex = /^\d{10}$/;
    const value = control.value;

    if (!value) return null;

    if (!phoneNumberRegex.test(value)) return { invalidPhoneNumber: true };

    return null;
  };

  // Custom validator function for validating age
  ageValidator: () => ValidatorFn = () => (control) => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    return age <= 18 ? { invalidAge: true } : null;
  };

  // Helper method to format date strings
  formatDate: (dateString: string) => string = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
    return date.toISOString().split('T')[0];
  };

  // Validator function for date of birth
  dateOfBirthValidator: (control: FormControl) => ValidationErrors | null = (
    control
  ) => {
    const currentDate = new Date();
    const enteredDate = new Date(control.value);
    const age = currentDate.getFullYear() - enteredDate.getFullYear();

    return age < 18 ? { underage: true } : null;
  };
}
