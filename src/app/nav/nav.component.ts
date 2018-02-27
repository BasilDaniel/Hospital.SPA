import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  userLoggedIn: any;
  userForLogin: any;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    console.log('nav init');
    this.userLoggedIn = this.authService.userLoggedIn;
    if(localStorage.getItem('Token'))
      this.userForLogin  = 'nobody';
    else
      this.userForLogin  = 'patient';
  }
  
  Login(user){
    this.userLoggedIn = user;
      this.authService.login(this.model, user).subscribe(data => {
        this.alertify.success("Вы вошли в систему");
      }, error => {
        this.alertify.error("Ошибка входа!");
      }, () => {
        if(user == "staff")
          this.router.navigate(['/staff/staff', this.authService.userId]);

        else if(user == "patient")
          this.router.navigate(['/patient/staffs']);

        else if(user == "admin")
          this.router.navigate(['/admin/staffs']);
        this.userForLogin = 'nobody';
      });    
    console.log(this.userForLogin);
  }

  Logout(user){
    this.authService.logout();
    this.userLoggedIn = 'nobody';
    this.userForLogin = user;
    this.alertify.success("Вы вышли");
    this.router.navigate(['/home']);    
  }

 LoggedIn(user){
    this.userLoggedIn = this.authService.userLoggedIn;
    var verifyUser: boolean;
    if(user == this.userLoggedIn){
      verifyUser = true;
    }
    else{
      verifyUser = false;
    }

    if(this.authService.loggedIn(user) && user == this.userLoggedIn)
    {
      console.log('authService.loggedIn ' + this.authService.loggedIn(user) + '  user ' + verifyUser + '  user ' + user);
      return true;
    }
    else
    {
      console.log('authService.loggedIn ' + this.authService.loggedIn(user) + '  user ' + verifyUser + '  user ' + user);
      return false;
    }          
  }

  //UI functions
  ToggleLoginForm(user){
    if(this.userForLogin == user)
      return true;
    else
      return false;
  }

  ActivateLoginForm(user){
    this.userForLogin = user;
  }
}
