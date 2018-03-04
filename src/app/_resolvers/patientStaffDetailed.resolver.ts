import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientDetailed } from '../_models/PatientDetailed';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { SharedStaffDetailed } from '../_models/SharedStaffDetailed';
import { PatientStaffDetailed } from '../_models/PatientStaffDetailed';
import { PatientService } from '../_services/patient.service';

@Injectable()
export class PatientStaffDetailedResolver implements Resolve<PatientStaffDetailed> {

    constructor(
        private patientService: PatientService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PatientStaffDetailed> {
        return this.patientService.getStaff(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}