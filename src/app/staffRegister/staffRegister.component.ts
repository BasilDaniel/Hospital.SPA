import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
import { SharedDepartmentsList } from '../_models/SharedDepartmentsList';
import { SharedPositionsList } from '../_models/SharedPositionsList';
import { SharedService } from '../_services/shared.service';
import { AppointmentService } from '../_services/appointment.service';

@Component({
  selector: 'app-staffRegister',
  templateUrl: './staffRegister.component.html',
  styleUrls: ['./staffRegister.component.css']
})
export class StaffRegisterComponent implements OnInit {
  staffModel: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];
  appointmentDurations: any;

  constructor(private authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router,
    private fb: FormBuilder,
    private _localeService: BsLocaleService,
    private sharedService: SharedService,
    private appointmentService: AppointmentService) { }

  ngOnInit() {
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    this.createRegisterForm();
    
    this.loadDepartments();
    this.loadPositions();
    this.appointmentDurations = this.appointmentService.appointmentDurations;
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      name: ['', Validators.required],
      middleName: ['', Validators.required],
      familyName: ['', Validators.required],
      birthdate: [null, Validators.required],
      departmentId: [null, Validators.required],
      positionId: [null, Validators.required],
      appointmentDuration: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  StaffRegister() {
    if (this.registerForm.valid){
      const urlPart: string = this.authService.userLoggedIn + '/staff';
      this.staffModel = Object.assign({}, this.registerForm.value);
      console.log(this.registerForm.value);
      console.log(this.staffModel);
      this.authService.register(this.staffModel, urlPart).subscribe(() => {
        this.alertify.success('Новый сотрудник зарегистрирован');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/admin/staffs']);          
        }); 
    }
  }

  loadDepartments(){
    this.sharedService.getDepartmentsList()
    .subscribe((data: SharedDepartmentsList[]) => {      
      this.sharedDepartmentsList = data;
    })  
  }

  loadPositions(){
    this.sharedService.getPositionsList()
    .subscribe((data: SharedPositionsList[]) => {      
      this.sharedPositionsList = data;
    })  
  }

}
