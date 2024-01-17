import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private userService: UserService) {}

  list: User[] = [];
  ngOnInit() {
    this.getUser();
  }

  getUser = () => {
    this.userService.getAllUser().subscribe((data) => (this.list = data));
  };
 
}
