import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-component',
  templateUrl: './toast-component.component.html',
  styleUrls: ['./toast-component.component.scss'],
})
export class ToastComponentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  show() {
    let myToastEl = document.getElementById('myToastEl');
   
  }
}
