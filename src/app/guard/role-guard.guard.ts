import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services";

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated() || this.authService.isExpired()) {
      this.router.navigate(['']).then();
      return false;
    }

    const role = next.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal.fire('Acceso denegado', 'No tienes acceso a este recurso', 'warning').then();
    this.router.navigate(['/clients']).then();
    return false;
  }

}
