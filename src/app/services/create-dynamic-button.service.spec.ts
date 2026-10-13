import { TestBed } from '@angular/core/testing';

import { CreateDynamicButtonService } from './create-dynamic-button.service';

describe('CreateDynamicButtonService', () => {
  let service: CreateDynamicButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDynamicButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
