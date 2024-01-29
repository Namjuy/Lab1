// pagination.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  
  @Output() currentPage = new EventEmitter<number>();
  @Output() itemsPerPageNumber = new EventEmitter<number>();
  @Input() totalRow :any;
  @Input() totalPage: any;
  @Input() indexFirstItem: any;
  @Input() indexLastItem: any;
 
  currentPageIndex = 1;
  itemsPerPage = 10;
  
  
  ngOnInit() {}

  setItemPerPage(numberPerPage: number) {
    this.itemsPerPage = numberPerPage;
    this.itemsPerPageNumber.emit(numberPerPage);
  }

  handlePreviousPage = () => {
    if (this.currentPageIndex !== 1) {
      this.currentPageIndex = this.currentPageIndex - 1;
      this.currentPage.emit(this.currentPageIndex);
    }
  };

  handleNextPage = () => {
    if (this.currentPageIndex !== this.totalPage) {
      this.currentPageIndex = this.currentPageIndex + 1;
      this.currentPage.emit(this.currentPageIndex);
    }
  };

  changePage = (pageNumber: number) => {
    this.currentPage.emit(pageNumber);
  };

  getPages() {
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  }
}
