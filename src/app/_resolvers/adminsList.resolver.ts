import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { AdminsList } from '../_models/AdminsList';
import { AdminService } from '../_services/admin.service';

@Injectable()
export class AdminsListResolver implements Resolve<AdminsList> {

    constructor(private adminService: AdminService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AdminsList> {
        return this.adminService.getAdminsList().catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/admin/admins']);
            return Observable.of(null);
        }); 
    }
}