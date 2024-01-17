import { Component, Input, OnInit } from '@angular/core';

interface DropDownItem {
  title: string;
  firstItem: string;
  secondItem: string;
  thirdItem: string;
}

@Component({
  selector: 'app-home-dropdown',
  templateUrl: './home-dropdown.component.html',
  styleUrls: ['./home-dropdown.component.scss'],
})
export class HomeDropdownComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input() item: DropDownItem = {
    title: '',
    firstItem: '',
    secondItem: '',
    thirdItem: '',
  };
}
