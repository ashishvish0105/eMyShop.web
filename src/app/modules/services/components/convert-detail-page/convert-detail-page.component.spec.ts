import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertDetailPageComponent } from './convert-detail-page.component';

describe('ConvertDetailPageComponent', () => {
  let component: ConvertDetailPageComponent;
  let fixture: ComponentFixture<ConvertDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
