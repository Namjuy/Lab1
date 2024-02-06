// user-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() selectedUser: any;
  @Input() isCreateCheck: any;

  displayedGender = 'Nam';
  isSubmitted = false;
  isValid = false;

  updateForm: FormGroup | any;
  createForm: FormGroup | any;

  initializeForm = (isCreate: boolean = false): FormGroup => {
    const commonControls = {
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
          Validators.maxLength(50),
        ],
      ],
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      dateOfBirth: [
        '',
        [this.userService.dateOfBirthValidator, Validators.required],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9 ]{10}')],
      ],
      email: ['',Validators.email],
      isMale: [1, Validators.required],
      address: [''],
    };

    if (isCreate) {
      return this.formBuilder.group(
        {
          ...commonControls,
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.authService.passwordMatchValidator }
      );
    } else {
      return this.formBuilder.group(commonControls);
    }
  };

  labelUpdateItem = [
    { label: 'Tên đăng nhập', inputHolderValue: 'Nhập tên đăng nhập', type: 'userName' },
    { label: 'Họ tên nhân viên', inputHolderValue: 'Nhập tên tài xế', type: 'fullName' },
    { label: 'Ngày sinh', inputHolderValue: '', type: 'dateOfBirth' },
    { label: 'Giới tính', inputHolderValue: '', type: 'isMale' },
    { label: 'Số điện thoại di động', inputHolderValue: 'Nhập số điện thoại', type: 'phoneNumber' },
    { label: 'Email', inputHolderValue: 'Nhập email', type: 'email' },
    { label: 'Địa chỉ', inputHolderValue: 'Nhập địa chỉ', type: 'address' },
  ];

  labelCreateItem = [
    ...this.labelUpdateItem,
    { label: 'Mật khẩu', inputHolderValue: 'Nhập mật khẩu', type: 'newPassword' },
    { label: 'Nhập lại mật khẩu', inputHolderValue: 'Nhập lại mật khẩu', type: 'confirmPassword' },
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  get f() {
    return this.isCreateCheck ? this.createForm?.controls : this.updateForm?.controls;
  }

  ngOnInit(): void {
    this.createForm = this.initializeForm(true);
    this.updateForm = this.initializeForm();
    this.displayedGender = this.setDisplayedGender();
  }

  formatTime = (date: string): string => this.userService.formatDate(date);

  setDisplayedGender = () => {
    if (this.selectedUser) {
      this.displayedGender = this.selectedUser['isMale'] == 0 ? 'Nữ' : 'Nam';
    }
    return this.displayedGender;
  };

  setGender = (form: FormGroup, gender: number) => {
    this.displayedGender = gender == 1 ? 'Nam' : 'Nữ';
    const isMaleControl = form.get('isMale');
    if (isMaleControl) {
      isMaleControl.setValue(gender);
      this.selectedUser['isMale'] = gender;
    }
    this.setDisplayedGender();
  };

  setSubmit = () => {
    this.isSubmitted = false;
  };

  onSubmit = () => {
    this.isSubmitted = true;
    this.selectedUser ? this.updateUser() : this.createUser();
  };

  updateUser = () => {
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
          this.toastService.showToastMessage('toast-updateSuccess');
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          console.error('Error updating user:', error);
          this.toastService.showToastMessage('toast-updateFailed');
        }
      );
    }
  };

  createUser = () => {
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
          this.toastService.showToastMessage('toast-createSuccess');
          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        (error) => {
          console.error('Error creating user:', error);
          this.toastService.showToastMessage('toast-createFailed');
        }
      );
    }
  };
}
