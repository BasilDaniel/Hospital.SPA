import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientDetailed } from '../_models/PatientDetailed';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { SharedStaffDetailed } from '../_models/SharedStaffDetailed';
import { SharedService } from '../_services/shared.service';

@Injectable()
export class SharedStaffDetailedResolver implements Resolve<SharedStaffDetailed> {

    constructor(
        private sharedService: SharedService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SharedStaffDetailed> {
        return this.sharedService.getStaff(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}