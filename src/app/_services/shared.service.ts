import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {
    baseUrl: string;

constructor(private authHttp: AuthHttp, private authService: AuthService) { 
    this.baseUrl = this.getUrl();
}
    getUrl() {
        if (this.authService.userLoggedIn === 'patient')
            return environment.apiPatientUrl;

        else if (this.authService.userLoggedIn === 'staff')
            return environment.apiStaffUrl;

        else if (this.authService.userLoggedIn === 'admin')
            return environment.apiAdminUrl;
    }

    getDepartments(){
        // this.getUrl();
        return this.authHttp.get(this.baseUrl + 'departments')
        .map((response: any) => response.json())
        .catch(this.handleError);
    }

    getPositions(){
        // this.getUrl();
        return this.authHttp.get(this.baseUrl + 'positions')
        .map((response: any) => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any){
        const applicationError = error.headers.get('Application-error');
        if(applicationError){
            return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if(serverError){
            for(const key in serverError){
                if(serverError[key]){
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(modelStateErrors || 'Server error');
    }
}

