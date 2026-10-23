import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithTitleComponent } from './table-with-title.component';

describe('TableWithTitleComponent', () => {
  let component: TableWithTitleComponent;
  let fixture: ComponentFixture<TableWithTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWithTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should calculate pagination when table data is provided', () => {
    fixture.componentRef.setInput('pageSize', 2);
    fixture.componentRef.setInput('tableData', [
      { productId: 1, name: 'A' },
      { productId: 2, name: 'B' },
      { productId: 3, name: 'C' },
      { productId: 4, name: 'D' }
    ]);

    fixture.detectChanges();

    expect(component.totalPages).toBe(2);
    expect(component.paginatedData.length).toBe(2);
    expect(component.paginatedData[0].productId).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should show the server-provided page without slicing it again', () => {
    fixture.componentRef.setInput('serverSidePagination', true);
    fixture.componentRef.setInput('totalCount', 25);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput(
      'tableData',
      Array.from({ length: 10 }, (_, index) => ({ productId: index + 11 })),
    );
    fixture.detectChanges();

    let requestedPage = 0;
    component.pageSizeChange.subscribe(({ currentPage }) => requestedPage = currentPage);
    component.goToPage(2);

    expect(component.totalPages).toBe(3);
    expect(component.paginatedData.length).toBe(10);
    expect(component.paginatedData[0].productId).toBe(11);
    expect(requestedPage).toBe(2);
    expect(component.currentPage).toBe(2);
  });
});
