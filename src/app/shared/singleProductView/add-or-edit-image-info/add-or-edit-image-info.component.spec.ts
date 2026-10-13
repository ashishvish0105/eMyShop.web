import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditImageInfoComponent } from './add-or-edit-image-info.component';

describe('AddOrEditImageInfoComponent', () => {
  let component: AddOrEditImageInfoComponent;
  let fixture: ComponentFixture<AddOrEditImageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditImageInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditImageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
