// Import necessary modules from Angular

import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Toast } from 'bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
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
  displayedGender = 'Nam';
  isSubmitted = false;
  isValid = false;
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
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
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
      type: 'newPassword',
    },
    {
      label: 'Nhập lại mật khẩu',
      inputHolderValue: 'Nhập lại mật khẩu',
      type: 'confirmPassword',
    },
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.displayedGender = this.setDisplayedGender();
  }

  get f() {
    return !this.isCreateCheck
      ? this.updateForm.controls
      : this.createForm.controls;
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', [this.dateOfBirthValidator, Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9 ]{10}')],
      ],
      email: [''],
      isMale: [1, Validators.required],
      address: [''],
    });

    this.createForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        fullName: ['', Validators.required],
        dateOfBirth: ['', [this.dateOfBirthValidator, Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9 ]{10}')],
        ],
        email: [''],
        isMale: [1, Validators.required],
        address: [''],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        Validators: this.authService.passwordMatchValidator,
      }
    );

    this.displayedGender = this.setDisplayedGender();
  }

  formatTime(date: string): string {
    return this.userService.formatDate(date);
  }

  setDisplayedGender() {
    if (this.selectedUser) {
      this.displayedGender = this.selectedUser['isMale'] == 0 ? 'Nữ' : 'Nam';
    }
    return this.displayedGender;
  }

  setGender(form: FormGroup, gender: number) {
    this.displayedGender = gender == 1 ? 'Nam' : 'Nữ';
    const isMaleControl = form.get('isMale');
    if (isMaleControl) {
      isMaleControl.setValue(gender);
      this.selectedUser['isMale'] = gender;
    }
    this.setDisplayedGender();
  }

  setSubmit = () => {
    this.isSubmitted = false;
  };

  onSubmit() {
    this.isSubmitted = true;
    this.selectedUser ? this.updateUser() : this.createUser();
  }

  updateUser() {
    const updateId = localStorage.getItem('userId');
    if (this.updateForm.valid) {
      const userId = this.selectedUser.userId;
      const updatedUserData = {
        ...this.updateForm.value,
        lastModifyUserId: updateId,
        passWordHash: this.selectedUser.passWordHash,
      };

      this.userService.updateUser(userId, updatedUserData).subscribe(
        () => {
          this.showToastMessage('toast-updateSuccess');
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  createUser() {
    const createId = localStorage.getItem('userId');

    if (this.createForm.valid) {
      const now = new Date();
      const createUserData = {
        ...this.createForm.value,
        email: this.createForm.get('email')?.value || '',
        address: this.createForm.get('address')?.value || '',
        passWordHash: this.createForm.get('newPassword')?.value,
        userType: 1,
        companyId: 123,
        creatorUserId: createId,
        lastModifyUserId: createId,
        createDate: now.toISOString(),
        lastModifyDate: now.toISOString(),
        isDeleted: false,
        deletedDate: null,
      };

      delete createUserData.confirmPassword;
      delete createUserData.newPassword;

      this.userService.createUser(createUserData).subscribe(
        () => {
          this.showToastMessage('toast-createSuccess');
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          console.error('Error creating user:', error);
          this.showToastMessage('toast-createFailed');
        }
      );
    }
  }

  dateOfBirthValidator = (control: FormControl) => {
    const currentDate = new Date();
    const enteredDate = new Date(control.value);

    // Calculate age in years
    const age = currentDate.getFullYear() - enteredDate.getFullYear();

    // Check if the age is less than 18
    return age < 18 ? { underage: true } : null;
  };

  showToastMessage(valid: string) {
    const toastLiveExample = document.getElementById(valid);

    if (toastLiveExample) {
      const toastBootstrap = new Toast(toastLiveExample);
      toastBootstrap.show();
    }
  }
}
