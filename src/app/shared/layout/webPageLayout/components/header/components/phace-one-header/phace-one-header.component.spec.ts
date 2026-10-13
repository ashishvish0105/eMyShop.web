import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaceOneHeaderComponent } from './phace-one-header.component';

describe('PhaceOneHeaderComponent', () => {
  let component: PhaceOneHeaderComponent;
  let fixture: ComponentFixture<PhaceOneHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaceOneHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaceOneHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
