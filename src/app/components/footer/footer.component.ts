import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

////Name   Date       Comments
////duypn  21/12/2023  create
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // Handle the mouse wheel event to horizontally scroll a container.
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
      area: 'TRỤ SỞ HÀ NỘI',
      location: 'Lô 14 phố Nguyễn Cảnh Dị, Q. Hoàng Mai, Hà Nội',
    },
    {
      area: 'HẢI PHÒNG',
      location:
        'Căn BH 01- 47 Khu đô thị Vinhomes Imperia, Đ. Bạch Đằng, P. Thượng Lý, Q. Hồng Bàng, TP. Hải Phòng.',
    },
    {
      area: 'CHI NHÁNH MIỀN TRUNG',
      location: 'Số B5-15, ngõ 26, Đ. Nguyễn Thái Học, TP. Vinh, Nghệ An.',
    },
    {
      area: 'ĐÀ NẴNG',
      location:
        'Lô 1 Khu B2-19, KĐT Biệt thự sinh thái, Công Viên Văn Hóa Làng Quê và Quần thể Du lịch sông nước, P. Hòa Quý, Ngũ Hành Sơn, TP. Đà Nẵng.',
    },
    {
      area: 'TP HỒ CHÍ MINH',
      location:
        'Số 9, Đường 37, KĐT Vạn Phúc, P. Hiệp Bình Phước, TP. Thủ Đức, TP. Hồ Chí Minh.',
    },
    {
      area: 'HÀ TĨNH',
      location: 'Số 402, Đ. Trần Phú, X. Thạch Trung, TP. Hà Tĩnh, Hà Tĩnh',
    },
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
