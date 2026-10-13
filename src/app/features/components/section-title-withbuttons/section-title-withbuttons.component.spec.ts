import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTitleWithbuttonsComponent } from './section-title-withbuttons.component';

describe('SectionTitleWithbuttonsComponent', () => {
  let component: SectionTitleWithbuttonsComponent;
  let fixture: ComponentFixture<SectionTitleWithbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTitleWithbuttonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTitleWithbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
