import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})

////Name   Date       Comments
////duypn  25/1/2024  create
export class ChangePasswordModalComponent implements OnInit {
  @Input() selectedUser?: User;
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.authService.passwordMatchValidator.bind(this),
      }
    );
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid && this.selectedUser) {
      this.userService
        .changePassword(
          this.selectedUser.userId,
          this.changePasswordForm.get('oldPassword')?.value,
          this.changePasswordForm.get('newPassword')?.value,
          this.changePasswordForm.get('confirmPassword')?.value
        )
        .subscribe(
          () => {
            console.log(1);
          },
          (error) => {
            console.error('Error changePassword user:', error);
          }
        );
    }
  }
}
