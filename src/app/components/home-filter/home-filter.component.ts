import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss']
})
export class HomeFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchOptionItems = 
    {
      title: 'Tên đăng nhập',
      firstItem: 'Họ và tên',
      secondItem: 'Email',
      thirdItem: 'Số điện thoại',
    }
  
    filterOptionItems = {
      title : 'Chọn thời gian',
      firstItem:'Giới tính',
      secondItem:'Ngày sinh'
    }
  
}
