import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() deleteUser: (() => void) | undefined;

  @Input() getUser: (() => void) | undefined;
  constructor() {}

  ngOnInit() {}

  handleDelete() {
    if (this.deleteUser) {
      this.deleteUser();
    }
  }
}
