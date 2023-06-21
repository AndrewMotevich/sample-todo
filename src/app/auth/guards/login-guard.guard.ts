import { inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

export const IsLoggedInFunctionGuard = () => {
  const loginService = inject(LoginService);
  if (loginService.getUser()) {
    return true;
  } else {
    return false;
  }
};

export const MainPageRedirect = () => {
  const loginService = inject(LoginService);
  if (loginService.getUser()) {
    return false;
  } else {
    return true;
  }
};
