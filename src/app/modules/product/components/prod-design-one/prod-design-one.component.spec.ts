import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDesignOneComponent } from './prod-design-one.component';

describe('ProdDesignOneComponent', () => {
  let component: ProdDesignOneComponent;
  let fixture: ComponentFixture<ProdDesignOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdDesignOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdDesignOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
