import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowServicesItemComponent } from './show-services-item.component';

describe('ShowServicesItemComponent', () => {
  let component: ShowServicesItemComponent;
  let fixture: ComponentFixture<ShowServicesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowServicesItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowServicesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
