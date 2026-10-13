import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedMainSectionComponent } from './news-feed-main-section.component';

describe('NewsFeedMainSectionComponent', () => {
  let component: NewsFeedMainSectionComponent;
  let fixture: ComponentFixture<NewsFeedMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsFeedMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsFeedMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
