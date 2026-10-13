import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGenereteComponent } from './token-generete.component';

describe('TokenGenereteComponent', () => {
  let component: TokenGenereteComponent;
  let fixture: ComponentFixture<TokenGenereteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenGenereteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenGenereteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
