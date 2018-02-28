import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { StaffService } from '../_services/staff.service';
import { SharedService } from '../_services/shared.service';
import { SharedAppointmentsList } from '../_models/SharedAppointmentsList';

@Injectable()
export class SharedAppointmentsListResolver implements Resolve<SharedAppointmentsList> {
    pageSize = 5;
    pageNumber = 1;

    constructor(       
        private sharedService: SharedService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SharedAppointmentsList> {
        return this.sharedService.getAppointmentsList(this.pageNumber, this.pageSize).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}