import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class CarouselComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {}

  // Define a variable numIndicators
  numIndicators = 3;

  // Initialize a password variable and set it to an empty string
  password: string = '';

  // Initialize a boolean variable isShowPassword and set it to false
  isShowPassword: boolean = false;

  // Create an array of numbers with a length equal to the value of numIndicators
  // The array is created using Array.from() and a mapping function that returns the index
  getIndicators(): number[] {
    return Array.from({ length: this.numIndicators }, (_, index) => index);
  }

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
      image: 'https://bagps.vn/public/media//art_2801.jpg',
    },
    {
      title: 'CAPTION2',
      detail: 'DETAIL2',
      image: "../../assets/banner_web-04.png",
    },
    {
      title: 'CAPTION3',
      detail: 'DETAIL3',
      image:
        'https://bagps.vn/public/media/banner_web.jpg',
    },
  ];
}
