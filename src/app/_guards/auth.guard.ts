import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';;
import { AlertConfig } from 'ngx-bootstrap/alert/alert.config';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class StaffAuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authservice.loggedIn("staff")){
      console.log(this.authservice.loggedIn("staff"));
      return true;
    }
    console.log(this.authservice.loggedIn("staff"));
    this.alertify.error('Войдите чтобы получить доступ');
    this.router.navigate(['/home']);
    return false;
  }
}

@Injectable()
export class PatientAuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authservice.loggedIn("patient")){
      return true;
    }

    console.log(this.authservice.loggedIn("patient"));
    this.alertify.error('Войдите чтобы получить доступ');
    this.router.navigate(['/home']);
    return false;
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authservice.loggedIn("admin")){
      console.log(this.authservice.loggedIn("admin"));
      return true;
    }
    console.log(this.authservice.loggedIn("admin"));
    this.alertify.error('Войдите чтобы получить доступ');
    this.router.navigate(['/home']);
    return false;
  }
}
