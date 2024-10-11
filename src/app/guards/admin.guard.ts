import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const _userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  if (_userService.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
  // return _userService.role === 'ADMIN_ROLE' ? true : false;
};
