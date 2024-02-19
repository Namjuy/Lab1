import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})

////Name   Date       Comments
////duypn  24/1/2024  create
export class ConfirmDialogComponent implements OnInit {
  @Input() deleteUser: (() => void) | undefined;

  @Input() getUser: (() => void) | undefined;

  // Constructor
  constructor() {}

  // Lifecycle hook - ngOnInit
  ngOnInit() {}

  // Arrow function to handle delete action
  handleDelete = (): void => {
    // Check if deleteUser function is defined before invoking it
    if (this.deleteUser) {
      this.deleteUser();
    }
  };
}
