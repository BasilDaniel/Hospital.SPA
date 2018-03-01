import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { SharedPositionsList } from '../_models/SharedPositionsList';
import { SharedService } from '../_services/shared.service';
import { SharedPositionDetailed } from '../_models/SharedPositionDetailed';

@Injectable()
export class SharedPositionDetailedResolver implements Resolve<SharedPositionDetailed> {

    constructor(private sharedService: SharedService,
        private router: Router, 
        private alertify: AlertifyService,
        private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<SharedPositionDetailed> {
        return this.sharedService.getPosition(route.params['id']).catch(error => {
            this.alertify.error('Проблемы при получении данных');
            this.router.navigate(['/home']);
            return Observable.of(null);
        }); 
    }
}