import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthService){}

  ngOnInit(){
    console.log('app init');
    const token = localStorage.getItem('Token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.userLoggedIn = this.jwtHelper.decodeToken(token).role;
      this.authService.userId = this.jwtHelper.decodeToken(token).nameid;
      
    }
  }
  
}
