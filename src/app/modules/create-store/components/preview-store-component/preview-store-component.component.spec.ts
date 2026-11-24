import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewStoreComponentComponent } from './preview-store-component.component';

describe('PreviewStoreComponentComponent', () => {
  let component: PreviewStoreComponentComponent;
  let fixture: ComponentFixture<PreviewStoreComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewStoreComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewStoreComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
