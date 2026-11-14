import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShopingCartComponent } from './my-shoping-cart.component';

describe('MyShopingCartComponent', () => {
  let component: MyShopingCartComponent;
  let fixture: ComponentFixture<MyShopingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyShopingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyShopingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
