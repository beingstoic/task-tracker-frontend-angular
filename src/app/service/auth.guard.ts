import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from './loginservice.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginservice: LoginserviceService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (this.loginservice.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
