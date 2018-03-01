import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientDetailed } from '../_models/PatientDetailed';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { AdminDetailed } from '../_models/AdminDetailed';
import { AdminService } from '../_services/admin.service';

@Injectable()
export class AdminDetailedResolver implements Resolve<AdminDetailed> {

    constructor(
        private adminService: AdminService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<AdminDetailed> {
        return this.adminService.getAdmin(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}