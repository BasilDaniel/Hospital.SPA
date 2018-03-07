import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthService {
    staffAuthUrl = 'http://localhost:5000/api/AuthStaff/';
    patientAuthUrl = 'http://localhost:5000/api/AuthPatient/';
    adminAuthUrl = 'http://localhost:5000/api/AuthAdmin/';
    Token: any;
    userForLogin: string;
    userLoggedIn: string = 'nobody';
    userId: number = null;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();

    

constructor(private http: Http, private authHttp: AuthHttp) { }


    //Login user
    login(model: any, user: any){
        if(user == 'staff'){
            return this.http.post(this.staffAuthUrl + 'login', model, this.requestOptions()).map((response: Response) => {
                const staff = response.json();
                if (staff){
                    localStorage.setItem('Token', staff.tokenString);
                    this.decodedToken = this.jwtHelper.decodeToken(staff.tokenString);
                    this.Token = staff.tokenString;
                    this.userLoggedIn = user;
                    this.userForLogin = 'nobody';
                    this.userId = this.decodedToken.nameid;
                }
            }).catch(this.handleError);
        }
        else if(user == 'patient'){
            return this.http.post(this.patientAuthUrl + 'login', model, this.requestOptions()).map((response: Response) => {
                const patient = response.json();
                if (patient){
                    localStorage.setItem('Token', patient.tokenString);
                    this.decodedToken = this.jwtHelper.decodeToken(patient.tokenString);
                    this.Token = patient.tokenString;
                    this.userLoggedIn = user;
                    this.userForLogin = 'nobody';
                    this.userId = this.decodedToken.nameid;
                    console.log(this.userId);
                }
            }).catch(this.handleError);
        }
        if(user == 'admin'){
            return this.http.post(this.adminAuthUrl + 'login', model, this.requestOptions()).map((response: Response) => {
                const admin = response.json();
                if (admin){
                    localStorage.setItem('Token', admin.tokenString);
                    this.decodedToken = this.jwtHelper.decodeToken(admin.tokenString);
                    this.Token = admin.tokenString;
                    this.userLoggedIn = user;
                    this.userForLogin = 'nobody';
                    this.userId = this.decodedToken.nameid;
                }
            }).catch(this.handleError);
        }
    }

    register(model: any, user: any) {
        if(user == 'admin/admin')
            return this.authHttp.post(this.adminAuthUrl + 'registerAdmin', model, this.requestOptions()).catch(this.handleError);
        else if(user == 'admin/staff')
            return this.authHttp.post(this.adminAuthUrl + 'registerStaff', model, this.requestOptions()).catch(this.handleError);
        else if(user == 'admin/patient')
            return this.authHttp.post(this.adminAuthUrl + 'registerPatient', model, this.requestOptions()).catch(this.handleError);
        else if(user == 'nobody/patient')
            return this.http.post(this.patientAuthUrl + 'register', model, this.requestOptions()).catch(this.handleError);
    }


    //shared actions
    loggedIn(user) {
        if(this.userLoggedIn == user && tokenNotExpired('Token')){
            return true;
        }
        else{
            return false;
        }
    }

    logout(){
        this.Token = null;
        localStorage.removeItem('Token');
        this.userLoggedIn = 'nobody';
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