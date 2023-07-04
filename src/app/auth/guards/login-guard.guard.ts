import { inject } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

export const isLoggedInFunctionGuard = () => {
  const loginService = inject(LoginService);

  return loginService.isLoggedIn;
};
