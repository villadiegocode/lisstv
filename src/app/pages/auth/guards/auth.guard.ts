import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = await authService.isSession();
    console.log(isAuthenticated);


    if (isAuthenticated) {
        return true;
    }else {
        router.navigate(['/auth']);
        return false;
    }

};
