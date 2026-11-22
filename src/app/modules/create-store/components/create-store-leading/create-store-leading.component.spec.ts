import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreLeadingComponent } from './create-store-leading.component';

describe('CreateStoreLeadingComponent', () => {
  let component: CreateStoreLeadingComponent;
  let fixture: ComponentFixture<CreateStoreLeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStoreLeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStoreLeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
