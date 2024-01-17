

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class CarouselComponent {


  // Constructor for a class that takes TranslateService as a private params
  //TODO: use TranslateService like a library to change language
  constructor(private translate: TranslateService, private userService:UserService, private router:Router) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }


  // Initialize a password variable and set it to an empty string
  username: string = ''
  password: string = '';

  // Initialize a boolean variable isShowPassword and set it to false
  isShowPassword: boolean = false;

  // The array is created using Array.from() and a mapping function that returns the index
  ellipsify = (str: string) => {
    if (str.length > 50) {
      return str.substring(0, 50) + '...';
    } else {
      return str;
    }
  };

  // Create a method to toggle the visibility of the password
  tooglePasswordVisible = () => {
    this.isShowPassword = !this.isShowPassword;
  };

  // Initialize an array of carousel items
  carouselItems = [
    {
      title: 'CAPTION1',
      detail: 'DETAIL1',
      image: '../../assets/banner_web-04.png',
    },
    {
      title: 'CAPTION2',
      detail: 'DETAIL2',
      image: '../../assets/banner_web-03.jpg',
    },
    {
      title: 'CAPTION3',
      detail: 'DETAIL3',
      image: '../../assets/banner_web-02.jpg',
    },
  ];

   // Function to handle login
   login(): void {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        if(response!=null){
          console.log("Đăng nhập thành công");
          this.router.navigate(['/']);
        }
      },
      (error) => {
        // Handle login error
        console.error("Đăng nhập thất bại");
        // You might want to display an error message to the user
      }
    );
  }

  

  
}
