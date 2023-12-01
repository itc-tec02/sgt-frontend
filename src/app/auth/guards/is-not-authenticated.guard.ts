import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );
console.log("Entró aqui not auth");

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    console.log("Quiero probar");

    router.navigateByUrl('');
    return false;
  }

  return true;
};
