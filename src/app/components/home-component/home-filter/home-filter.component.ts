import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss'],
})
export class HomeFilterComponent implements OnInit {
  @Output() handleSearch = new EventEmitter<any>();

  inputSearchValue: string = '';
  selectOptionValue = '';
  startDate = '';
  endDate = '';
  selectedGender = '';

  filterMap = new Map();

  constructor() {}

  ngOnInit() {}

  onSearch = () => {
    this.filterMap.set('searchFilterInput', this.inputSearchValue);
    this.filterMap.set('selectOptionValue', this.selectOptionValue);
    this.filterMap.set('startDate', this.startDate);
    this.filterMap.set('endDate', this.endDate);
    this.filterMap.set('selectedGender', this.selectedGender);
    this.handleSearch.emit(this.filterMap);
  };
}
