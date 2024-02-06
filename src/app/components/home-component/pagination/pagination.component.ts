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

  @Input() totalRow: any;
  @Input() totalPage: any;
  @Input() indexFirstItem: any;
  @Input() indexLastItem: any;
  @Input() currentPageIndex = 1;
  

  itemsPerPage = 10;

  ngOnInit() {
   
  }

  // Set items per page and emit the value
  setItemPerPage = (numberPerPage: number) => {
    this.itemsPerPage = numberPerPage;
    this.itemsPerPageNumber.emit(numberPerPage);
  };

  // Handle previous page
  handlePreviousPage = () => {
    if (this.currentPageIndex !== 1) {
      this.currentPageIndex = this.currentPageIndex - 1;
      this.currentPage.emit(this.currentPageIndex);
    }
  };

  // Handle next page
  handleNextPage = () => {
    if (this.currentPageIndex !== this.totalPage) {
      this.currentPageIndex = this.currentPageIndex + 1;
      this.currentPage.emit(this.currentPageIndex);
    }
  };

  // Handle first page
  handleFirstPage = () => {
    this.currentPageIndex = 1;
    this.currentPage.emit(1);
  };

  // Handle last page
  handleLastPage = () => {
    this.currentPageIndex = this.totalPage;
    this.currentPage.emit(this.totalPage);
  };

  // Change page
  changePage = (pageNumber: number) => {
    this.currentPageIndex = pageNumber;
    this.currentPage.emit(pageNumber);
  };

  // Get an array of page numbers
  getPages = () => {
    return Array.from({ length: this.totalPage }, (_, index) => index + 1);
  };
}
