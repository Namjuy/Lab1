import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent implements OnInit {
  @Output() startDateValue = new EventEmitter<string>();
  @Output() endDateValue = new EventEmitter<string>();
  @Output() selectedGenderValue = new EventEmitter<string>();

  selectedGender: string = '';
  startDate: string = '';
  endDate: string = '';


  onStartDateChange(startDate: any): void {
    this.startDateValue.emit(this.formatDate(startDate));
  }

  onEndDateChange(endDate: any): void {
    console.log(endDate);

    this.endDateValue.emit(this.formatDate(endDate));
  }

  onGenderChange(): void {
   
    if (this.selectedGender == 'male') {
      this.selectedGenderValue.emit('1');
    }
    if (this.selectedGender == 'female') {
      this.selectedGenderValue.emit('0');
    }
    if (this.selectedGender == '') {
      this.selectedGenderValue.emit('');
    }

    console.log(this.selectedGender);
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  formatDate(data: string): string {
    if (data) {
      return this.userService.formatDate(data);
    }
    return '';
  }


}
