import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProressBarComponent } from './proress-bar.component';

describe('ProressBarComponent', () => {
  let component: ProressBarComponent;
  let fixture: ComponentFixture<ProressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
