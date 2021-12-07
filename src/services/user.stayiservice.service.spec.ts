import { TestBed } from '@angular/core/testing';

import { User.StayiserviceService } from './user.stayiservice.service';

describe('User.StayiserviceService', () => {
  let service: User.StayiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User.StayiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
