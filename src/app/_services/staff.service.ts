import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PatientDetailed } from '../_models/PatientDetailed';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { SharedStaffsList } from '../_models/SharedStaffsList';

@Injectable()
export class StaffService {
    baseUrl = environment.apiStaffUrl;
    
    constructor(private authHttp: AuthHttp) { }

    getStaffs(id): Observable<SharedStaffsList>{
        return this.authHttp.get(this.baseUrl + 'staffs')
        .map(response => <PatientDetailed>response.json())
        .catch(this.handleError);
    }

    getPatientId(id): Observable<PatientDetailed>{
        console.log('staff2');
        return this.authHttp.get(this.baseUrl + 'patient/' + id)
        .map(response => <PatientDetailed>response.json())
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