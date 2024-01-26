// home-dropdown.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-dropdown',
  templateUrl: './home-dropdown.component.html',
  styleUrls: ['./home-dropdown.component.scss'],
})
export class HomeDropdownComponent {
  @Output() selectOptionValue = new EventEmitter<string>();

  optionValue = 'Chọn kiểu tìm kiếm';
  selectedOption: string = 'userName';

  selectOption(option: string) {
    this.selectedOption = option;

    switch (option) {
      case 'userName':
        this.optionValue = 'Tên đăng nhập';
        break;
      case 'fullName':
        this.optionValue = 'Họ và tên';
        break;
      case 'email':
        this.optionValue = 'Email';
        break;
      case 'phone':
        this.optionValue = 'Số điện thoại';
        break;
    }

    this.selectOptionValue.emit(this.selectedOption);
  }
}
