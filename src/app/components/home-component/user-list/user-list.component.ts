import { Component, Input, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

////Name   Date       Comments
////duypn  17/1/2024  create
export class UserListComponent implements OnInit {

  // Flags and variables
  isCreateCheck: boolean = true;
  userList: User[] = [];
  totalUserList: User[] = [];
  selectedUser: User | any;
  deletedUser: User | any;

  // Filtering and pagination variables
  userFilter: any;
  itemsPerPage = 10;
  currentPage = 1;
  totalPage = 0;
  indexOfLastItem = 0;
  indexOfFirstItem = 0;
  totalRow = 0;

  deleteUserList: User[] = [];

  inputPaginationData = new Map();

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // Calculate initial index and fetch user data
    this.calculateIndex(this.totalUserList);
    this.getUser();
  }

  // Update input pagination data
  updatePaginationData = (): void => {
    this.inputPaginationData.set('currentPage', this.currentPage);
    this.inputPaginationData.set('totalPage', this.totalPage);
    this.inputPaginationData.set('indexOfLastItem', this.indexOfLastItem);
    this.inputPaginationData.set('indexOfFirstItem', this.indexOfFirstItem);
    this.inputPaginationData.set('totalRow', this.totalRow);
  };

  // Handle changes in items per page
  handleItemPerPage = (event: any) => {
    this.itemsPerPage = event;
    this.handleCurrentPage(this.currentPage);
  };

  // Handle changes in current page
  handleCurrentPage = (event: any) => {
    this.currentPage = event;
    this.calculateIndex(this.totalUserList);
    this.userList = this.totalUserList.slice(
      this.indexOfFirstItem,
      this.indexOfLastItem
    );

    this.updatePaginationData();
  };

  // Handle search functionality
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
        this.totalUserList = response;
        this.totalRow = this.totalUserList.length;
        this.handleCurrentPage(1);
        this.userList = response.slice(0, this.indexOfLastItem);
      });
  };

  setDeleteUserList = () => {
    this.deleteUserList = this.totalUserList.filter((item) => item.isSelected);
  };

  // Handle deletion of users
  handleDeleteUser = () => {
    this.deleteUserList.length == 0
      ? this.deleteUser()
      : this.deleteListUser(this.deleteUserList);
  };

  // Delete a list of users
  deleteListUser = (selectedListUser: User[]) => {
    selectedListUser.forEach((item) =>
      this.userService.deleteUser(item.userId).subscribe(() => {
        this.toastService.showToastMessage('toast-updateSuccess');
        this.getUser();
        this.deleteUserList = [];
      })
    );
  };

  // Set user to be deleted
  getDeleteUser = (user: User) => (this.deletedUser = user);

  // Delete a single user
  deleteUser = () => {
    if (this.deletedUser) {
      this.userService.deleteUser(this.deletedUser?.userId).subscribe(() => {
        this.toastService.showToastMessage('toast-updateSuccess');

        this.getUser();

        this.deleteUserList = [];
      });
    }
  };

  // Get details of a selected user
  getSelectedUser = (user: User) => {
    this.isCreateCheck = false;
    this.selectedUser = user;
  };

  // Fetch all users
  getUser = (): void => {
    this.userService.getAllUser().subscribe((data) => {
      this.totalUserList = data;
      this.totalRow = this.totalUserList.length;
      this.calculateIndex(this.totalUserList);
      this.userList = data.slice(this.indexOfFirstItem, this.indexOfLastItem);
    });
  };

  // Navigate to create user mode
  createUser = () => (
    (this.isCreateCheck = true), (this.selectedUser = undefined)
  );

  // Calculate pagination indices
  private calculateIndex = (newList: User[]) => {
    this.totalPage = Math.ceil(newList.length / this.itemsPerPage);
    this.indexOfLastItem =
      this.currentPage * this.itemsPerPage > newList.length
        ? newList.length
        : this.currentPage * this.itemsPerPage;
    this.indexOfFirstItem = (this.currentPage - 1) * this.itemsPerPage;
    this.updatePaginationData();
  };

  convertDateFormat = (inputDateString: Date) => {
    return this.datePipe.transform(inputDateString, 'dd/MM/yyyy');
  };
}
