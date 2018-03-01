import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PatientDetailed } from '../_models/PatientDetailed';
import { Injectable } from '@angular/core';
import { PatientService } from '../_services/patient.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { StaffService } from '../_services/staff.service';
import { SharedPatientDetailed } from '../_models/SharedPatientDetailed';
import { SharedService } from '../_services/shared.service';

@Injectable()
export class SharedPatientDetailedResolver implements Resolve<SharedPatientDetailed> {

    constructor(private sharedService: SharedService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SharedPatientDetailed> {
        return this.sharedService.getPatient(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/patient/staffs']);
            return Observable.of(null);
        }); 
    }
}