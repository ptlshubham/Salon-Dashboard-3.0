import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorGuard } from './auth-http-interceptor.guard';

describe('AuthHttpInterceptorGuard', () => {
  let guard: AuthHttpInterceptorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthHttpInterceptorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
