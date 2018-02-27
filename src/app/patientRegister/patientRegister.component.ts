import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientRegister',
  templateUrl: './patientRegister.component.html',
  styleUrls: ['./patientRegister.component.css']
})
export class PatientRegisterComponent implements OnInit {
  patientModel: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    console.log('patientRegister init');
  }

  PatientRegister() {
    const user = 'patient';
    this.authService.register(this.patientModel, user).subscribe(() => {
      this.alertify.success('Вы зарегистрированы');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.authService.login(this.patientModel, user).subscribe(() => {
        this.authService.userLoggedIn = user;
        this.router.navigate(['/patient/patient']);
      });      
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
