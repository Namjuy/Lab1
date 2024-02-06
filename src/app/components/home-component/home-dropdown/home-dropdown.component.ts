import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home-dropdown',
  templateUrl: './home-dropdown.component.html',
  styleUrls: ['./home-dropdown.component.scss'],
})
export class HomeDropdownComponent {
  
  @Output() selectOptionValue = new EventEmitter<string>();

  // Default option value and selected option
  optionValue = 'Tên đăng nhập';
  selectedOption: string = 'userName';

  // Function to handle option selection
  selectOption = (option: string): void => {
    // Update the selected option
    this.selectedOption = option;

    // Set the corresponding option value based on the selected option
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
      case 'phoneNumber':
        this.optionValue = 'Số điện thoại';
        break;
    }

    // Emit the selected option value through the output event
    this.selectOptionValue.emit(this.selectedOption);
  };
}
