import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { PatientAppointmentsList } from '../_models/PatientAppointmentsList';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';
import { AlertifyService } from './alertify.service';
import { SharedAppointmentsList } from '../_models/SharedAppointmentsList';

@Injectable()
export class AppointmentService {
    patientAppointmentsList: PatientAppointmentsList[];
    userParams: any = {};  
    pagination: Pagination;
    workingHours: DateTimeFormat; 
    appointmentToCreateData: any;
    appointmentDurations = [
        {
          "placeholder": "5 минут",
          "data": "00:05:00"
        }, 
        {
          "placeholder": "10 минут",
          "data": "00:10:00"
        },
        {
          "placeholder": "15 минут",
          "data": "00:15:00"
        },
         {
          "placeholder": "20 минут",
          "data": "00:20:00"
        },
        {
          "placeholder": "25 минут",
          "data": "00:25:00"
        }, 
        {
          "placeholder": "30 минут",
          "data": "00:30:00"
        }
      ];

constructor(
    private authHttp: AuthHttp, 
    private authService: AuthService,
    private sharedService: SharedService,
    private alertify: AlertifyService) { }

getBaseUrl() {//have to be changed to more scalable unit
    if (this.authService.userLoggedIn === 'patient')
        return environment.apiPatientUrl;

    else if (this.authService.userLoggedIn === 'staff')
        return environment.apiStaffUrl;

    else if (this.authService.userLoggedIn === 'admin')
        return environment.apiAdminUrl;
}

getAppointmentsList(page?: number, itemsPerPage?: number, userParams?: any){
    const paginatedResult: PaginatedResult<PatientAppointmentsList[]> = new PaginatedResult<PatientAppointmentsList[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
        queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if(userParams != null){
        // console.log(userParams);
        queryString += 
        'dateTime=' + userParams.dateTime +
        '&staffId=' + userParams.staffId;
    }
    // console.log(queryString);
    return this.authHttp
    .get(this.getBaseUrl() + 'appointments' + queryString.toLowerCase())
    .map((response: Response) => {
        paginatedResult.result = response.json();
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }

        return paginatedResult;
      })
    .catch(this.handleError);
}

register(model: any) {
    return this.authHttp.post(this.getBaseUrl() + 'createAppointment', model, this.requestOptions()).catch(this.handleError);
}

private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({ headers: headers });
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