import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewStoreComponent } from './preview-store.component';

describe('PreviewStoreComponent', () => {
  let component: PreviewStoreComponent;
  let fixture: ComponentFixture<PreviewStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
