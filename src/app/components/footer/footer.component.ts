import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

////Name   Date       Comments
////duypn  21/12/2023  create
export class FooterComponent implements OnInit {
  constructor(private translate:TranslateService) {
    translate.addLangs(['vi', 'en']);
    translate.setDefaultLang('vi');
  }

  ngOnInit() {}

  // Initialize to handle the mouse wheel event when horizontally scroll footer location
  onMouseWheel(event: WheelEvent): void {
    if (event.deltaY !== 0) {
      const scrollContainer = event.currentTarget as HTMLElement;

       // Adjust the horizontal scroll of the container based on the deltaY value.
      scrollContainer.scrollLeft += event.deltaY;

      event.preventDefault();
    }
  }

  // Initialize an array of location items for the footer.
  footerLocationItems = [
    {
      area: 'AREA1',
      location: 'LOCATION1',
    },
    {
      area: 'AREA2',
      location: 'LOCATION2',
    },
    {
      area: 'AREA3',
      location: 'LOCATION3',
    },
    {
      area: 'AREA4',
      location: 'LOCATION4',
    },
    {
      area: 'AREA5',
      location: 'LOCATION5',
    },
    {
      area: 'AREA6',
      location: 'LOCATION6',
    }
  ];

  // Initialize an array of app store items for the footer
  footerAppItem = [
    {
      link: 'https://play.google.com/store/apps/details?id=vn.bagps.gpsmobile&hl=en_US',
      imageURL: '../../../assets/googleplay.png',
      imageName: 'googleplay',
    },
    {
      link: 'https://apps.apple.com/vn/app/ba-gps/id1466206178?l=vi',
      imageURL: '../../../assets/appstore.png',
      imageName: 'appstore',
    },
  ];

  // Initialize an array of social media items for the footer.
  footerSocialItem = [
    {
      link: 'https://www.facebook.com/bagps.vn/',
      imageURL: '../../../assets/facebook-icon.png',
      imageName: 'facebook-icon',
    },
    {
      link: '',
      imageURL: '../../../assets/zalo-icon.png',
      imageName: 'zalo-icon',
    },
    {
      link: 'https://www.youtube.com/c/BAGPS',
      imageURL: '../../../assets/youtube-icon.png',
      imageName: 'youtube-icon',
    },
  ];
}
