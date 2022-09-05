import { TestBed } from '@angular/core/testing';

import { AnimeEntryService } from './anime-entry.service';

describe('AnimeEntryService', () => {
  let service: AnimeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
