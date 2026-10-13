import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDetailDesignOneComponent } from './prod-detail-design-one.component';

describe('ProdDetailDesignOneComponent', () => {
  let component: ProdDetailDesignOneComponent;
  let fixture: ComponentFixture<ProdDetailDesignOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdDetailDesignOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdDetailDesignOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
