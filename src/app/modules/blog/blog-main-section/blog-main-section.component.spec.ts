import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMainSectionComponent } from './blog-main-section.component';

describe('BlogMainSectionComponent', () => {
  let component: BlogMainSectionComponent;
  let fixture: ComponentFixture<BlogMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
