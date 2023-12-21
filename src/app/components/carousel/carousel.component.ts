import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  numIndicators = 3;

  getIndicators(): number[] {
    return Array.from({ length: this.numIndicators }, (_, index) => index);
  }

  carouselItems = [
    {
      title: 'HỖ TRỢ ĐỊNH VỊ PHƯƠNG TIỆN NGOÀI KHƠI',
      detail:
        'GPS định vị toạ độ của phương tiện đảm bảo sự an toàn của người dân',
      image: 'https://bagps.vn/public/media//art_2801.jpg',
    },
    {
      title: 'HỖ TRỢ ĐỊNH VỊ PHƯƠNG TIỆN NGOÀI KHƠI',
      detail:
        'GPS định vị toạ độ của phương tiện đảm bảo sự an toàn của người dân',
      image: 'https://i.ytimg.com/vi/_sSd4OVYVCk/maxresdefault.jpg',
    },
    {
      title: 'HỖ TRỢ ĐỊNH VỊ PHƯƠNG TIỆN NGOÀI KHƠI',
      detail:
        'GPS định vị toạ độ của phương tiện đảm bảo sự an toàn của người dân',
      image:
        'https://bagps.vn/public/media//tai_li%E1%BB%87u/4_%C6%AFu_vi%E1%BB%86t_giup_thong_thai_l%E1%BB%B0a_ch%E1%BB%8Cn_camera_ngh%E1%BB%8A_%C4%90%E1%BB%8Anh_10_ti%E1%BA%BEt_ki%E1%BB%86m_7_tri%E1%BB%86u_vn%C4%90.png',
    },
  ];
}
