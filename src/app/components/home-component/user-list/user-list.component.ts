import { Component, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';
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
  deletedUser: User | undefined;
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
    console.log(this.userFilter.get('selectedGender'));
    
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
    const selectedListUser = this.totalUserList.filter(
      (item) => item.isSelected
    );

    selectedListUser.length == 0
      ? this.deleteUser()
      : this.deleteListUser(selectedListUser);
  };

  deleteListUser = (selectedListUser: User[]) => {
    selectedListUser.forEach((item) =>
      this.userService.deleteUser(item.userId).subscribe(() => {
        this.showToastMessage('toast-updateSuccess');
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    );
  };

  getDeleteUser = (user: User) => {
    this.deletedUser = user;
  };
  deleteUser = () => {
    if (this.deletedUser) {
      this.userService.deleteUser(this.deletedUser?.userId).subscribe(() => {
        this.showToastMessage('toast-updateSuccess');
        setTimeout(() => {
          location.reload();
        }, 2000);
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

  showToastMessage(valid: string) {
    const toastLiveExample = document.getElementById(valid);

    if (toastLiveExample) {
      const toastBootstrap = new Toast(toastLiveExample);
      toastBootstrap.show();
    }
  }
}
