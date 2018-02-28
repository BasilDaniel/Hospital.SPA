import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AdminsList } from '../_models/AdminsList';

@Injectable()
export class AdminService {
    baseUrl = environment.apiAdminUrl;

constructor(private authHttp: AuthHttp) { }

getAdminsList(){
    return this.authHttp.get(this.baseUrl + 'admins')
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