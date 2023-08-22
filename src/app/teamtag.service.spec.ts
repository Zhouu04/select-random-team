import { TestBed } from '@angular/core/testing';

import { TeamtagService } from './teamtag.service';

describe('TeamtagService', () => {
  let service: TeamtagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamtagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
