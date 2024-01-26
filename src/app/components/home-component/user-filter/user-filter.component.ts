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

  onStartDateChange(): void {
    this.startDateValue.emit(this.formatDate(this.startDate));
  }

  onEndDateChange(): void {
    this.endDateValue.emit(this.formatDate(this.endDate));
  }

  onGenderChange(): void {
    this.selectedGenderValue.emit(this.selectedGender);
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  formatDate(data: string): string {
    return this.userService.formatDate(data);
  }
}
