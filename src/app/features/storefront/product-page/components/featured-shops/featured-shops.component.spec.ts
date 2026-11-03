import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedShopsComponent } from './featured-shops.component';

describe('FeaturedShopsComponent', () => {
  let component: FeaturedShopsComponent;
  let fixture: ComponentFixture<FeaturedShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedShopsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
