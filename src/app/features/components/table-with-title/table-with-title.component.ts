import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-table-with-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-with-title.component.html',
  styleUrl: './table-with-title.component.scss'
})
export class TableWithTitleComponent implements OnInit, OnChanges {
  @Input() titleName: string = '';
  @Input() tableColumnNamas: any[] = [];
  @Input() tableData: any;
  @Input() tableClass: string = '';
  @Input() pageSize: number = 10;
  @Input() serverSidePagination: boolean = false;
  @Input() totalCount: number = 0;
  @Input() showRowActions: boolean = false;
  @Output() pageSizeChange: EventEmitter<{pageSize: number; currentPage: number; }> = new EventEmitter<{ pageSize: number; currentPage: number; }>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();

  currentPage: number = 1;
  totalPages: number = 1;
  paginatedData: any[] = [];

  ngOnInit(): void {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] || changes['pageSize'] || changes['totalCount'] || changes['serverSidePagination']) {
      this.updatePagination();
    }
  }

  updatePagination(): void {
    const data = Array.isArray(this.tableData) ? this.tableData : [];
    const safePageSize = Math.max(1, this.pageSize || 1);

    if (!this.serverSidePagination) {
      this.totalCount = data.length;
    }
    const totalItems = this.serverSidePagination ? this.totalCount : data.length;
    this.totalPages = totalItems > 0 ? Math.max(1, Math.ceil(totalItems / safePageSize)) : 1;
    this.currentPage = Math.min(Math.max(this.currentPage, 1), this.totalPages);

    if (this.serverSidePagination) {
      this.paginatedData = data;
      return;
    }

    const startIndex = (this.currentPage - 1) * safePageSize;
    this.paginatedData = data.slice(startIndex, startIndex + safePageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    const paginationObject = {
      pageSize: this.pageSize,
      currentPage: this.currentPage
    };
    this.pageSizeChange.emit(paginationObject);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

get visiblePageNumbers(): number[] {
  if (this.totalPages <= 5) {
    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }

  if (this.currentPage <= 3) {
    return [1, 2, 3, this.totalPages - 1, this.totalPages];
  }

  if (this.currentPage >= this.totalPages - 2) {
    return [
      1,
      this.totalPages - 3,
      this.totalPages - 2,
      this.totalPages - 1,
      this.totalPages
    ];
  }

  return [
    1,
    this.currentPage - 1,
    this.currentPage,
    this.totalPages - 1,
    this.totalPages
  ];
}

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  mathMin(firstValue: number, secondValue: number): number {
    return Math.min(firstValue, secondValue);
  }

  getNestedValue(row: any, field: string): any {
    return field.split('.').reduce(
      (obj, key) => obj?.[key],
      row
    );
  }
}
