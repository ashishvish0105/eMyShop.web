import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWithSectionTitleComponent } from './icon-with-section-title.component';

describe('IconWithSectionTitleComponent', () => {
  let component: IconWithSectionTitleComponent;
  let fixture: ComponentFixture<IconWithSectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconWithSectionTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconWithSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
