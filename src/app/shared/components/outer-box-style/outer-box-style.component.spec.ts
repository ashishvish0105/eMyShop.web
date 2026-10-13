import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterBoxStyleComponent } from './outer-box-style.component';

describe('OuterBoxStyleComponent', () => {
  let component: OuterBoxStyleComponent;
  let fixture: ComponentFixture<OuterBoxStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuterBoxStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterBoxStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
