import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { JwtService } from 'src/app/services/jwt-service/jwt.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class CarouselComponent {
  
  decodeToken: any;

  // Constructor for a class that takes TranslateService as a private params
  //TODO: use TranslateService like a library to change language
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  // Initialize a password variable and set it to an empty string
  username: string = '';
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

  // OnInit lifecycle hook
  ngOnInit() {
    // Assuming you have the token available after successful login
    const token = 'your_actual_token_here';
    this.decodeToken = this.jwtService.decodeToken(token);
  }

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

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response != null) {
          const token = response.token;
          this.decodeToken = this.jwtService.decodeToken(token);
          if(Number(this.decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])==1)
          {
            this.router.navigate(['/']);
            localStorage.setItem('authToken', JSON.stringify(this.decodeToken));
          }
          else{
            this.router.navigate(['/user'])
          }
        }
      },
      (error) => {
        console.error('Đăng nhập thất bại');
      }
    );
  }


}
