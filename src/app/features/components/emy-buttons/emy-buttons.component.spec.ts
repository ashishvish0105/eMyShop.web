import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmyButtonsComponent } from './emy-buttons.component';

describe('EmyButtonsComponent', () => {
  let component: EmyButtonsComponent;
  let fixture: ComponentFixture<EmyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmyButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
