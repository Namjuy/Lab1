import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})

////Name   Date       Comments
////duypn  17/1/2024  create
export class UserModalComponent implements OnInit {
  // Input properties for selectedUser and isCreateCheck
  @Input() selectedUser: any;
  @Input() totalUserList: User[] | any;
  @Input() isCreateCheck: any;
  @Output() getUser = new EventEmitter<any>();

  // Variable for displayed gender
  displayedGender = 'Nam';
  formInteracted: boolean = false;

  password = '';
  confirmPassword = '';
  // Variables for form status
  isSubmitted = false;
  isValid = false;

  // Initialize a boolean variable isShowPassword and set it to false
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;

  // Form groups for update and create forms
  updateForm: FormGroup | any;
  createForm: FormGroup | any;

  // Function to initialize form based on create/update mode
  initializeForm = (isCreate: boolean = false): FormGroup => {
    // Common form controls
    const commonControls = {
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
          Validators.maxLength(50),
          this.checkUserNameExist(),
        ],
      ],
      fullName: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$'),
        ],
      ],
      dateOfBirth: [
        '',
        [this.userService.dateOfBirthValidator, Validators.required],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9 ]{10}')],
      ],
      email: ['', Validators.email],
      isMale: [1],
      address: ['', Validators.pattern('^[a-zA-ZÀ-Ỹà-ỹ0-9 ]+$')],
    };

    // Additional controls for create mode
    if (isCreate) {
      return this.formBuilder.group(
        {
          ...commonControls,
          newPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(100),
              Validators.pattern('^[a-zA-Z0-9]+$'),
            ],
          ],
          confirmPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(100),
              Validators.pattern('^[a-zA-Z0-9]+$'),
            ],
          ],
        },
        {
          validators: this.authService.passwordMatchValidator,
        }
      );
    } else {
      return this.formBuilder.group(commonControls);
    }
  };

  // Arrays for form labels
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
    private authService: AuthService,
    private toastService: ToastService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.formInteracted = false;
  }

  // Getter function for form controls
  get f() {
    return this.isCreateCheck
      ? this.createForm?.controls
      : this.updateForm?.controls;
  }

  ngOnInit(): void {
    // Initialize forms and set displayed gender
    this.createForm = this.initializeForm(true);
    this.updateForm = this.initializeForm(false);
    this.displayedGender = this.setDisplayedGender();
    this.listenForOutsideClick();
  }

  //Catch event when click out side of modal
  listenForOutsideClick = () => {
    this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const isClickInsideModal = this.elementRef.nativeElement.contains(
        event.target
      );
      if (!isClickInsideModal) {
        this.setSubmit();
      }
    });
  };

  // Function to format time
  formatTime = (date: string): string => this.userService.formatDate(date);

  // Function to set displayed gender
  setDisplayedGender = () => {
    if (this.selectedUser) {
      this.displayedGender = this.selectedUser['isMale'] == 0 ? 'Nữ' : 'Nam';
    }
    return this.displayedGender;
  };

  // Function to set gender
  setGender = (form: FormGroup, gender: number) => {
    this.displayedGender = gender == 1 ? 'Nam' : 'Nữ';
    const isMaleControl = form.get('isMale');
    if (isMaleControl) {
      isMaleControl.setValue(gender);
      this.selectedUser['isMale'] = gender;
    }
    this.setDisplayedGender();
  };

  // Function to reset form submission status
  setSubmit = () => {
    this.isSubmitted = false;
    if (this.selectedUser) {
      this.isCreateCheck = false;
    } else {
      this.isCreateCheck = true;
    }
    // Reset the form to the previously selected user's data
    const formData = this.isCreateCheck ? this.createForm : this.updateForm;
    if (formData && this.selectedUser) {
      formData.patchValue({
        ...this.selectedUser,
        dateOfBirth: this.formatTime(this.selectedUser.dateOfBirth),
      });
    } else if (formData && !this.selectedUser) {
      formData.reset();
    }
  };

  // Function to handle form submission
  onSubmit = () => {
    this.isSubmitted = true;
    this.selectedUser ? this.updateUser() : this.createUser();
  };

  // Function to update user
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
          this.getUser.emit();
          this.isSubmitted = false;
        },
        (error) => {
          console.error('Error updating user:', error);
          this.toastService.showToastMessage('toast-updateFailed');
        }
      );
    }
  };

  // Function to create user
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
          this.getUser.emit();
          this.createForm.reset();
          this.isSubmitted = false;
        },
        (error) => {
          this.toastService.showToastMessage('toast-createFailed');
        }
      );
    }
  };

  // Create a method to toggle the visibility of the password
  tooglePasswordVisible = () => {
    this.isShowPassword = !this.isShowPassword;
  };

  toggleConfirmPasswordVisible = () => {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  };

  checkUserNameExist(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const username = control.value;
      const user = this.totalUserList.find(
        (user: User) => user.userName === username
      );

      return user ? { existed: true } : null;
    };
  }
}
