import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFavoritesComponent } from './customer-favorites.component';

describe('CustomerFavoritesComponent', () => {
  let component: CustomerFavoritesComponent;
  let fixture: ComponentFixture<CustomerFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
