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
  totalUserList: User[] = [];
  selectedUser: User | undefined;
  userFilter: any;
  itemsPerPage = 10;
  currentPage = 1;
  totalPage = 0;
  indexOfLastItem = 0;
  indexOfFirstItem = 0;
  totalRow = 0;
  totalUserListSearch: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.calculateIndex(this.totalUserList);
    this.getUser();
  }

  handleItemPerPage(event: any) {
    this.itemsPerPage = event;
    this.handleCurrentPage(this.currentPage);
  }

  handleCurrentPage = (event: any) => {
    this.currentPage = event;

    this.calculateIndex(this.totalUserList);
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
        this.totalUserListSearch = response;
        this.totalRow = this.totalUserListSearch.length;
        this.calculateIndex(this.totalUserListSearch);
        this.userList = response.slice(
          this.indexOfFirstItem,
          this.indexOfLastItem
        );
      });
  };

  handleDeleteUser = () => {
    if (confirm('Are you sure you want to delete?')) {
      const selectedListUser = this.totalUserList.filter(
        (item) => item.isSelected == true
      );
      selectedListUser.forEach((element) => {
        this.userService.deleteUser(element.userId).subscribe(() => {
          this.totalUserList = this.totalUserList.filter(
            (item) => item.isSelected != true
          );
        });
      });
    }
  };

  getSelectedUser = (user: User) => {
    this.isCreateCheck = false;
    this.selectedUser = user;
  };

  getUser(): void {
    this.userService.getAllUser().subscribe((data) => {
      this.totalUserList = data;
      this.totalRow = this.totalUserList.length;
      this.calculateIndex(this.totalUserList);
      this.userList = data.slice(this.indexOfFirstItem, this.indexOfLastItem);
    });
  }

  createUser = (): void => {
    this.isCreateCheck = true;
  };

  private calculateIndex(newList: User[]) {
    this.totalPage = Math.ceil(newList.length / this.itemsPerPage);
    this.indexOfLastItem =
      this.currentPage * this.itemsPerPage > newList.length
        ? newList.length
        : this.currentPage * this.itemsPerPage;
    this.indexOfFirstItem = (this.currentPage - 1) * this.itemsPerPage;
  }
}
