import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStoreComponent } from './review-store.component';

describe('ReviewStoreComponent', () => {
  let component: ReviewStoreComponent;
  let fixture: ComponentFixture<ReviewStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
