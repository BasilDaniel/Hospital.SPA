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
    if (this.registerForm.valid){
      const user = this.authService.userLoggedIn + '/patient';
      this.patientModel = Object.assign({}, this.registerForm.value);
      this.authService.register(this.patientModel, user).subscribe(() => {
      this.alertify.success('Пациент зарегистрирован');
      }, error => {
        this.alertify.error(error);
      }, () => {
        if(this.authService.userLoggedIn == 'nobody'){
          this.authService.login(this.patientModel, 'patient').subscribe(() => {
          this.alertify.success("Вы вошли в систему");
          this.router.navigate(['/patient/patient', this.authService.userId]);
          });
        }
        else
        this.router.navigate(['/admin/patients']);
               
      });
    }
    
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
