import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  userList = [
    {
      isSelected: true,
      username: 'duypn',
      fullName: 'Phùng Nam Duy',
      id: 21,
      role: 'admin',
      lastLoginDate: '1/2/2024',
      loginInfor: 'Bình Anh| Samsung| Android 9',
      isLog: true,
    },
    {
      isSelected: false,
      username: 'vinhtn',
      fullName: 'Nguyễn Thành Vinh',
      id: 21,
      role: 'admin',
      lastLoginDate: '1/3/2024',
      loginInfor: 'Bình Anh| Samsung| Android 9',
      isLog: false,
    },
  ];
}
