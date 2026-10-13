import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageManagerMainSectionComponent } from './image-manager-main-section.component';

describe('ImageManagerMainSectionComponent', () => {
  let component: ImageManagerMainSectionComponent;
  let fixture: ComponentFixture<ImageManagerMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageManagerMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageManagerMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
