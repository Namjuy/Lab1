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


  //Initialize location item array
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
  ];

  //Initialize app store item array
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

  //Initialize social medial item array
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
