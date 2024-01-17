import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
export class HeaderComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  // Initialize method to handle switch language when choose dropdown
  switchLanguage = (language: string) => {
    this.translate.use(language);
    this.selectedLanguage = language;
  };

  // Define a property named selectedLanguage and initialize it
  selectedLanguage = 'vi';

  // Define an array property named menuItems of type MenuItem[].
  menuItems: MenuItem[] = [
    {
      title: 'HOME' ,
      link: 'https://bagps.vn/',
    },
    {
      title: 'PRODUCTS' ,
      link: 'https://bagps.vn/san-pham-va-giai-phap',
    },
    { title: 'NEWS' , link: 'https://bagps.vn/tin-tuc-c10' },
    {
      title: 'FEES' ,
      link: 'https://bagps.vn/huong-dan-dong-phi-dich-vu-ba-gps-d610',
    },
    {
      title: 'GUIDES',
      link: 'https://badoc.bagroup.vn/x/SAGhBg',
    },
    { title: 'NETWORK' , link: 'https://bagps.vn/mang-luoi' },
    { title: 'ABOUT', link: 'https://bagps.vn/gioi-thieu/' },
  ];
}
