import { CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
 constructor(private AuthService: AuthService, private router: Router) {}
 
 canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.AuthService.getUser().pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false; 
      }
    })
  );
 }
}
