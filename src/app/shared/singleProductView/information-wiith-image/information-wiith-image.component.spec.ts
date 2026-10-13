import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationWiithImageComponent } from './information-wiith-image.component';

describe('InformationWiithImageComponent', () => {
  let component: InformationWiithImageComponent;
  let fixture: ComponentFixture<InformationWiithImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationWiithImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationWiithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
