import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-patientRegister',
  templateUrl: './patientRegister.component.html',
  styleUrls: ['./patientRegister.component.css']
})
export class PatientRegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  patientModel: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router, 
    private fb: FormBuilder,
    private _localeService: BsLocaleService) { 
    }

  ngOnInit() {
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      name: ['', Validators.required],
      middleName: ['', Validators.required],
      familyName: ['', Validators.required],
      birthdate: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  PatientRegister() {
    // const user = 'patient';
    // this.authService.register(this.patientModel, user).subscribe(() => {
    //   this.alertify.success('Вы зарегистрированы');
    // }, error => {
    //   this.alertify.error(error);
    // }, () => {
    //   this.authService.login(this.patientModel, user).subscribe(() => {
    //     this.authService.userLoggedIn = user;
    //     this.router.navigate(['/patient/patient']);
    //   });      
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
