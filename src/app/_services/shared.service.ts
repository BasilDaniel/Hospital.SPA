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
import { SharedPatientDetailed } from '../_models/SharedPatientDetailed';
import { SharedStaffDetailed } from '../_models/SharedStaffDetailed';
import { SharedDiseasesList } from '../_models/SharedDiseasesList';
import { SharedAppointmentDetailed } from '../_models/SharedAppointmentDetailed';
import { SharedDepartmentDetailed } from '../_models/SharedDepartmentDetailed';
import { SharedPositionDetailed } from '../_models/SharedPositionDetailed';
import { SharedDiseaseDetailed } from '../_models/SharedDiseaseDetailed';

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

    getStaffsList(page?: number, itemsPerPage?: number, userParams?: any){
        const paginatedResult: PaginatedResult<SharedStaffsList[]> = new PaginatedResult<SharedStaffsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if(userParams != null){
            queryString +=
            'name=' + userParams.name +
            '&department=' + userParams.department +
            '&position=' + userParams.position;
        }

        return this.authHttp
        .get(this.getBaseUrl() + 'staffs' + queryString.toLowerCase())
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

    getPatientsList(page?: number, itemsPerPage?: number, userParams?: any){
        const paginatedResult: PaginatedResult<SharedPatientsList[]> = new PaginatedResult<SharedPatientsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if(userParams != null){
            queryString +=
            'name=' + userParams.name;
        }

        return this.authHttp
        .get(this.getBaseUrl() + 'patients' + queryString.toLowerCase())
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
    
    getAppointmentsList(page?: number, itemsPerPage?: number, userParams?: any){
        const paginatedResult: PaginatedResult<SharedAppointmentsList[]> = new PaginatedResult<SharedAppointmentsList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if(userParams != null){
            queryString +=
            'dateTime=' + userParams.dateTime +
            '&department=' + userParams.department +
            '&position=' + userParams.position;
        }

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

    getDiseasesList(page?: number, itemsPerPage?: number, userParams?: any){
        const paginatedResult: PaginatedResult<SharedDiseasesList[]> = new PaginatedResult<SharedDiseasesList[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if(userParams != null){
            queryString +=
            'name=' + userParams.name;
        }

        return this.authHttp
        .get(this.getBaseUrl() + 'diseases' + queryString.toLowerCase())
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

    getPatient(id): Observable<SharedPatientDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'patient/' + id)
        .map(response => <SharedPatientDetailed>response.json())
        .catch(this.handleError);
    }

    getStaff(id): Observable<SharedStaffDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'staff/' + id)
        .map(response => <SharedStaffDetailed>response.json())
        .catch(this.handleError);
    }

    getAppointment(id): Observable<SharedAppointmentDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'appointment/' + id)
        .map(response => <SharedAppointmentDetailed>response.json())
        .catch(this.handleError);
    }
    
    getDepartment(id): Observable<SharedDepartmentDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'department/' + id)
        .map(response => <SharedDepartmentDetailed>response.json())
        .catch(this.handleError);
    }

    getPosition(id): Observable<SharedPositionDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'position/' + id)
        .map(response => <SharedPositionDetailed>response.json())
        .catch(this.handleError);
    }

    getDisease(id): Observable<SharedDiseaseDetailed>{
        return this.authHttp.get(this.getBaseUrl() + 'disease/' + id)
        .map(response => <SharedDiseaseDetailed>response.json())
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

