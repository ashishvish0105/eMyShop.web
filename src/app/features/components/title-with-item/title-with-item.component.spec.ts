import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleWithItemComponent } from './title-with-item.component';

describe('TitleWithItemComponent', () => {
  let component: TitleWithItemComponent;
  let fixture: ComponentFixture<TitleWithItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleWithItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleWithItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
