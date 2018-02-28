import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PatientDetailed } from '../_models/PatientDetailed';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { SharedStaffsList } from '../_models/SharedStaffsList';
import { PatientStaffDetailed } from '../_models/PatientStaffDetailed';
import { PaginatedResult } from '../_models/pagination';
import { SharedPositionsList } from '../_models/SharedPositionsList';
import { SharedDepartmentsList } from '../_models/SharedDepartmentsList';

@Injectable()
export class PatientService {
    baseUrl = environment.apiPatientUrl;
    
    constructor(private authHttp: AuthHttp) { }

    getPatient(id): Observable<PatientDetailed>{
        return this.authHttp.get(this.baseUrl + 'patient/' + id)
        .map(response => <PatientDetailed>response.json())
        .catch(this.handleError);
    }

    getStaff(id): Observable<PatientStaffDetailed>{
        return this.authHttp.get(this.baseUrl + 'staff/' + id)
        .map(response => <PatientStaffDetailed>response.json())
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