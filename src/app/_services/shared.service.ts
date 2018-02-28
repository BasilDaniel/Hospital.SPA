import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../_models/pagination';
import { SharedStaffsList } from '../_models/SharedStaffsList';
import { SharedPatientsList } from '../_models/SharedPatientsList';
import { SharedAppointmentsList } from '../_models/SharedAppointmentsList';

@Injectable()
export class SharedService {

constructor(private authHttp: AuthHttp, private authService: AuthService) { }
    getBaseUrl() {//have to be changed to more scalable unit
        console.log(this.authService.userLoggedIn);
        if (this.authService.userLoggedIn === 'patient')
            return environment.apiPatientUrl;

        else if (this.authService.userLoggedIn === 'staff')
            return environment.apiStaffUrl;

        else if (this.authService.userLoggedIn === 'admin')
            return environment.apiAdminUrl;
    }

    getDepartmentsList(){
        return this.authHttp.get(this.getBaseUrl() + 'departments')
        .map((response: any) => response.json())
        .catch(this.handleError);
    }

    getPositionsList(){
        return this.authHttp.get(this.getBaseUrl() + 'positions')
        .map((response: any) => response.json())
        .catch(this.handleError);
    }

    getStaffsList(page?: number, itemsPerPage?: number){
        const paginatedResult: PaginatedResult<SharedStaffsList[]> = new PaginatedResult<SharedStaffsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }
        return this.authHttp
        .get(this.getBaseUrl() + 'staffs' + queryString)
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

    getPatientsList(page?: number, itemsPerPage?: number){
        const paginatedResult: PaginatedResult<SharedPatientsList[]> = new PaginatedResult<SharedPatientsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }
        return this.authHttp
        .get(this.getBaseUrl() + 'patients' + queryString)
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
    
    getAppointmentsList(page?: number, itemsPerPage?: number){
        const paginatedResult: PaginatedResult<SharedAppointmentsList[]> = new PaginatedResult<SharedAppointmentsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }
        return this.authHttp
        .get(this.getBaseUrl() + 'appointments' + queryString)
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

