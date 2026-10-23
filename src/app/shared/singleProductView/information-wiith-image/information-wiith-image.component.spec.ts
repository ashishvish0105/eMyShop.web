import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationWiithImageComponent } from './information-wiith-image.component';

describe('InformationWiithImageComponent', () => {
  let component: InformationWiithImageComponent;
  let fixture: ComponentFixture<InformationWiithImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationWiithImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationWiithImageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dataSource', {
      categoryId: 1,
      categoryName: 'Beverages',
      itemName: 'Coffee',
      itemdescription: 'Freshly brewed coffee.',
      isvisiable: true,
      itemImagePath: '/assets/coffee.jpg',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
