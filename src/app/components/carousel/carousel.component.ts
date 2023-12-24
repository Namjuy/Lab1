import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class CarouselComponent implements OnInit {
  constructor() {}

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
      title: 'NĂNG LỰC CÔNG NGHỆ',
      detail:
        'BA GPS tự hào mang đến cho ngành giao thông vận tải các sản phẩm ứng dụng các công nghệ lõi.',
      image: 'https://bagps.vn/public/media//art_2801.jpg',
    },
    {
      title: 'HỖ TRỢ CẢM BIẾN NHIÊN LIỆU',
      detail:
        'Tối ưu chi phí thông qua việc lắp đặt cảm biến nhiên liệu tích hợp định vị trên xe.',
      image: 'https://i.ytimg.com/vi/_sSd4OVYVCk/maxresdefault.jpg',
    },
    {
      title: 'HỖ TRỢ ĐỊNH VỊ PHƯƠNG TIỆN',
      detail:
        'GPS định vị toạ độ của phương tiện đảm bảo sự an toàn của người dân.',
      image:
        'https://bagps.vn/public/media//tai_li%E1%BB%87u/4_%C6%AFu_vi%E1%BB%86t_giup_thong_thai_l%E1%BB%B0a_ch%E1%BB%8Cn_camera_ngh%E1%BB%8A_%C4%90%E1%BB%8Anh_10_ti%E1%BA%BEt_ki%E1%BB%86m_7_tri%E1%BB%86u_vn%C4%90.png',
    },
  ];
}
