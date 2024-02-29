// user-filter.component.ts
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})

////Name   Date       Comments
////duypn  4/1/2024  create
export class UserFilterComponent implements OnInit {
  @Output() startDateValue = new EventEmitter<string>();
  @Output() endDateValue = new EventEmitter<string>();
  @Output() selectedGenderValue = new EventEmitter<string>();

  selectedGender: string = '';
  startDate: string = '';
  endDate: string = '';

  // Handle start date change
  onStartDateChange = (startDate: any): void => {
    this.startDateValue.emit(this.formatDate(startDate));
  }

  // Handle end date change
  onEndDateChange = (endDate: any): void => {
    this.endDateValue.emit(this.formatDate(endDate));
  }

  // Handle gender change
  onGenderChange = (): void => {
    if (this.selectedGender == 'male') {
      this.selectedGenderValue.emit('1');
    }
    if (this.selectedGender == 'female') {
      this.selectedGenderValue.emit('0');
    }
    if (this.selectedGender == '') {
      this.selectedGenderValue.emit('');
    }
  }

  constructor(private userService: UserService,private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  // Format date
  formatDate = (data: string): string => {
    if (data) {
      return this.userService.formatDate(data);
    }
    return '';
  }
}
