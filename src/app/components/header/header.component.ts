import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}


  //Initialize the navbar menu item array
  menuItems = [
    {
      title: 'Trang chủ',
      link: 'https://bagps.vn/',
    },
    {
      title: 'Sản phẩm dịch vụ',
      link: 'https://bagps.vn/san-pham-va-giai-phap',
    },
    {
      title: 'Tin tức',
      link: 'https://bagps.vn/tin-tuc-c10',
    },
    {
      title: 'Đóng phí',
      link: 'https://bagps.vn/huong-dan-dong-phi-dich-vu-ba-gps-d610',
    },
    {
      title: 'Hướng dẫn',
      link: 'https://badoc.bagroup.vn/x/SAGhBg',
    },
    {
      title: 'Mạng lưới',
      link: 'https://bagps.vn/mang-luoi',
    },
    {
      title: 'Về chúng tôi',
      link: 'https://bagps.vn/gioi-thieu/',
    },
  ];
}
