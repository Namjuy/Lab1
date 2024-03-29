import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from 'bootstrap';
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

  //Method to handle login
  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response != null) {
          const token = response.token;
          this.decodeToken = this.jwtService.decodeToken(token);

          if (
            Number(
              this.decodeToken[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ]
            ) == 1
          ) {
            this.showLoginMessage('toast-loginSuccess');
            localStorage.setItem('authToken', JSON.stringify(this.decodeToken));
            localStorage.setItem(
              'userId',
              JSON.stringify(
                this.decodeToken[
                  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                ]
              )
            );

            // Adding a delay before navigating to the home page
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000); // 2000 milliseconds (2 seconds)
          } else {
            this.router.navigate(['/user']);
          }
        }
      },
      (errorMess) => {
        this.showLoginMessage('toast-loginFailed');
        console.error('Đăng nhập thất bại',errorMess);
      }
    );
  }

  //Method to show login message
  showLoginMessage(valid: string) {
    const toastLiveExample = document.getElementById(valid);

    if (toastLiveExample) {
      const toastBootstrap = new Toast(toastLiveExample);
      toastBootstrap.show();
    }
  }
}
