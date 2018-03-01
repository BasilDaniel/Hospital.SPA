import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { SharedService } from '../_services/shared.service';
import { SharedDepartmentDetailed } from '../_models/SharedDepartmentDetailed';

@Injectable()
export class SharedDepartmentDetailedResolver implements Resolve<SharedDepartmentDetailed> {

    constructor(private sharedService: SharedService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SharedDepartmentDetailed> {
        return this.sharedService.getDepartment(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}