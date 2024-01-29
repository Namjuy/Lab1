// Import necessary modules from Angular
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() selectedUser: any;
  @Input() isCreateCheck: any;
  // Displayed gender string
  displayedGender = '';
  isSubmitted = false;
 toastElement: HTMLElement | null = document.querySelector('.toast');

  // Form groups for update and create operations
  updateForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    fullName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    isMale: new FormControl(),
    address: new FormControl(''),
  });

  createForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    fullName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    isMale: new FormControl(),
    password: new FormControl(''),
    repassword: new FormControl(''),
    address: new FormControl(''),
  });

  // Labels for input fields in update and create forms
  labelUpdateItem = [
    {
      label: 'Tên đăng nhập',
      inputHolderValue: 'Nhập tên đăng nhập',
      type: 'userName',
    },
    {
      label: 'Họ tên nhân viên',
      inputHolderValue: 'Nhập tên tài xế',
      type: 'fullName',
    },
    { label: 'Ngày sinh', inputHolderValue: '', type: 'dateOfBirth' },
    { label: 'Giới tính', inputHolderValue: '', type: 'isMale' },
    {
      label: 'Số điện thoại di động',
      inputHolderValue: 'Nhập số điện thoại',
      type: 'phoneNumber',
    },
    { label: 'Email', inputHolderValue: 'Nhập email', type: 'email' },
    { label: 'Địa chỉ', inputHolderValue: 'Nhập địa chỉ', type: 'address' },
  ];

  labelCreateItem = [
    ...this.labelUpdateItem,
    {
      label: 'Mật khẩu',
      inputHolderValue: 'Nhập mật khẩu',
      type: 'passwordHash',
    },
    {
      label: 'Nhập lại mật khẩu',
      inputHolderValue: 'Nhập lại mật khẩu',
      type: 'repassWord',
    },
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  get f() {
    return !this.isCreateCheck
      ? this.updateForm.controls
      : this.createForm.controls;
  }

  ngOnInit(): void {
    this.displayedGender =
      this.selectedUser && this.selectedUser.isMale === 1 ? 'Nam' : 'Nữ';

    // Initialize updateForm and createForm with formBuilder
    this.updateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: [''],
      phoneNumber: ['', Validators.maxLength(10)],
      email: ['', Validators.email],
      isMale: [null],
      address: [''],
    });

    this.createForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.maxLength(10)],
      email: ['', Validators.email],
      isMale: [null],
      address: [''],
      passwordHash: ['', [Validators.required]],
      repassWord: ['', [Validators.required]],
    });
  }

  formatTime(date: string): string {
    return this.userService.formatDate(date);
  }

  setUpdateGender(gender: number) {
    this.displayedGender = gender === 1 ? 'Nam' : 'Nữ';
    if (this.updateForm) {
      const isMaleControl = this.updateForm.get('isMale');
      if (isMaleControl) {
        isMaleControl.setValue(gender);
      }
    }
  }

  setCreateGender = (gender: number): void => {
    this.displayedGender = gender === 1 ? 'Nam' : 'Nữ';
    if (this.createForm) {
      const isMaleControl = this.createForm.get('isMale');
      if (isMaleControl) {
        isMaleControl.setValue(gender);
      }
    }
  };

  setSubmit = () => {
    this.isSubmitted = false;
  };

  onSubmit() {
    this.isSubmitted = true;
    
    this.selectedUser ? this.updateUser() : this.createUser();
  }

  updateUser() {
    if (this.updateForm.valid) {
      const userId = this.selectedUser.userId;
      const updatedUserData = {
        ...this.updateForm.value,
        passWordHash: this.selectedUser.passWordHash,
      };

      // Update user data using the userService
      this.userService.updateUser(userId, updatedUserData).subscribe(
        () => {
          window.location.reload();
        },
        (error) => console.error('Error updating user:', error)
      );
    }
  }

  createUser() {
    if (this.createForm.valid) {
      const now = new Date();

      const createUserData = {
        ...this.createForm.value,
        userType: 1,
        companyId: 123,
        creatorUserId: 'id1234',
        lastModifyUserId: 'id1234',
        createDate: now.toISOString(),
        lastModifyDate: now.toISOString(),
        isDeleted: false,
        deletedDate: null,
      };

      // Remove the 'repassword' field before sending the request
      delete createUserData.repassWord;

      // Create a new user using the userService
      this.userService.createUser(createUserData).subscribe(
        () => {
          console.log('success');
          window.location.reload();
        },
        (error) => console.error('Error creating user:', error)
      );
    }
  }


}
