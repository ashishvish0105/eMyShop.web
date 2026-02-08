import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRestaurant } from './main-restaurant';

describe('MainRestaurant', () => {
  let component: MainRestaurant;
  let fixture: ComponentFixture<MainRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainRestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRestaurant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
