import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConverterMainSectionComponent } from './pdf-converter-main-section.component';

describe('PdfConverterMainSectionComponent', () => {
  let component: PdfConverterMainSectionComponent;
  let fixture: ComponentFixture<PdfConverterMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfConverterMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfConverterMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
