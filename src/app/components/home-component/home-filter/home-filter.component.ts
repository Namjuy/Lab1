import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss'],
})

////Name   Date       Comments
////duypn  4/1/2024  create
export class HomeFilterComponent implements OnInit {
  
  // Output decorator to emit events to parent component
  @Output() handleSearch = new EventEmitter<any>();

  // Variables to hold filter values
  inputSearchValue: string = '';
  selectOptionValue = 'userName';
  startDate = '';
  endDate = '';
  selectedGender = '';

  // Map to store filter values
  filterMap = new Map();

  // Constructor for the component
  constructor() {}


  ngOnInit() {}

  // Event handler for the search button click
  onSearch = () => {
    // Populate the filter map with current filter values
    this.filterMap.set('searchFilterInput', this.inputSearchValue);
    this.filterMap.set('selectOptionValue', this.selectOptionValue);
    this.filterMap.set('startDate', this.startDate);
    this.filterMap.set('endDate', this.endDate);
    this.filterMap.set('selectedGender', (this.selectedGender));

    // Emit the filter map to the parent component
    this.handleSearch.emit(this.filterMap);
  };
}
