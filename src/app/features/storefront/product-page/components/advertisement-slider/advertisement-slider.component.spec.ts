import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementSliderComponent } from './advertisement-slider.component';

describe('AdvertisementSliderComponent', () => {
  let component: AdvertisementSliderComponent;
  let fixture: ComponentFixture<AdvertisementSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
