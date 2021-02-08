import { TestBed } from '@angular/core/testing';

import { ApiGradeService } from './api-grade.service';

describe('ApiGradeService', () => {
  let service: ApiGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
