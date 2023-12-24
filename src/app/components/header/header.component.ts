import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

////Name   Date       Comments
////duypn  19/12/2023  create
export class HeaderComponent implements OnInit {
  constructor() {}

  // Initialize the menuItems property by creating a shallow copy of the Vietnamese menu items
  ngOnInit() {
    this.menuItems = [...this.vietnameseMenuItems]
  }

  // Define a property named selectedLanguage and initialize it
  selectedLanguage = 'vi';

  // Define an array property named menuItems of type MenuItem[].
  menuItems: MenuItem[] = [];

  // Define an array named vietnameseMenuItems of type MenuItem[].
  vietnameseMenuItems: MenuItem[] = [
    { title: 'Trang chủ', link: 'https://bagps.vn/' },
    {
      title: 'Sản phẩm dịch vụ',
      link: 'https://bagps.vn/san-pham-va-giai-phap',
    },
    { title: 'Tin tức', link: 'https://bagps.vn/tin-tuc-c10' },
    {
      title: 'Đóng phí',
      link: 'https://bagps.vn/huong-dan-dong-phi-dich-vu-ba-gps-d610',
    },
    { title: 'Hướng dẫn', link: 'https://badoc.bagroup.vn/x/SAGhBg' },
    { title: 'Mạng lưới', link: 'https://bagps.vn/mang-luoi' },
    { title: 'Về chúng tôi', link: 'https://bagps.vn/gioi-thieu/' },
  ];

  // Define an array named englishMenuItems of type MenuItem[].
  englishMenuItems: MenuItem[] = [
    { title: 'Home', link: 'https://bagps.vn/' },
    {
      title: 'Products and Services',
      link: 'https://bagps.vn/san-pham-va-giai-phap',
    },
    { title: 'News', link: 'https://bagps.vn/tin-tuc-c10' },
    {
      title: 'Pay Fees',
      link: 'https://bagps.vn/huong-dan-dong-phi-dich-vu-ba-gps-d610',
    },
    { title: 'Guides', link: 'https://badoc.bagroup.vn/x/SAGhBg' },
    { title: 'Network', link: 'https://bagps.vn/mang-luoi' },
    { title: 'About Us', link: 'https://bagps.vn/gioi-thieu/' },
  ];

  // Define a method named changeLanguage to change the language when click dropdown
  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.menuItems =
      language === 'en'
        ? [...this.englishMenuItems]
        : [...this.vietnameseMenuItems];
  }
}
