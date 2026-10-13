import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailConvertComponent } from './detail-convert.component';

describe('DetailConvertComponent', () => {
  let component: DetailConvertComponent;
  let fixture: ComponentFixture<DetailConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailConvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
