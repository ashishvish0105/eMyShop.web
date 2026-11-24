import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductInStoreComponent } from './add-product-in-store.component';

describe('AddProductInStoreComponent', () => {
  let component: AddProductInStoreComponent;
  let fixture: ComponentFixture<AddProductInStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductInStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductInStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
