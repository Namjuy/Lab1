import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isCreateCheck: boolean = true;
  userList: User[] = [];
  selectedUser: User | undefined;
  userFilter: any;
  itemsPerPage = 5;
  totalPage = 0;
  currentPage = 1;
  indexOfLastItem = 0;
  indexOfFirstItem = 0;
  totalUserList: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.calculateIndex();
    this.getUser();
  }

  handleCurrentPage = (event: any) => {
    this.currentPage = event;
    this.calculateIndex();
    this.userList = this.totalUserList.slice(
      this.indexOfFirstItem,
      this.indexOfLastItem
    );
  };

  handleSearch = (event: any) => {
    this.userFilter = event;
    this.userService
      .searchUser(
        this.userFilter.get('searchFilterInput'),
        this.userFilter.get('selectOptionValue'),
        this.userFilter.get('startDate'),
        this.userFilter.get('endDate'),
        this.userFilter.get('selectedGender')
      )
      .subscribe((response) => {
        this.userList = response;
        this.calculateIndex();
      });
  };

  getSelectedUser = (user: User) => {
    this.isCreateCheck = false;
    this.selectedUser = user;
  };

  getUser(): void {
    this.userService.getAllUser().subscribe((data) => {
      this.totalPage = Math.ceil(data.length / this.itemsPerPage);
      this.totalUserList = data;
      this.calculateIndex();
      this.userList = data.slice(this.indexOfFirstItem, this.indexOfLastItem);
    });
  }

  createUser = (): void => {
    this.isCreateCheck = true;
  };

  private calculateIndex() {
    this.indexOfLastItem =
      this.currentPage * this.itemsPerPage > this.totalUserList.length
        ? this.totalUserList.length
        : this.currentPage * this.itemsPerPage;
    this.indexOfFirstItem = (this.currentPage - 1) * this.itemsPerPage;
  }
}
