import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
import { SharedDepartmentsList } from '../_models/SharedDepartmentsList';
import { SharedPositionsList } from '../_models/SharedPositionsList';
import { SharedService } from '../_services/shared.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminRegister',
  templateUrl: './adminRegister.component.html',
  styleUrls: ['./adminRegister.component.css']
})
export class AdminRegisterComponent implements OnInit {
  adminModel: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService, 
    private router: Router,
    private fb: FormBuilder,
    private _localeService: BsLocaleService,
    private sharedService: SharedService) { }

  ngOnInit() {
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    this.createRegisterForm();
    
    this.loadDepartments();
    this.loadPositions();
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
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  AdminRegister() {
    if (this.registerForm.valid){
      // console.log(this.registerForm.value);
      const urlPart: string = this.authService.userLoggedIn + '/admin';
      this.adminModel = Object.assign({}, this.registerForm.value);
      this.authService.register(this.adminModel, urlPart).subscribe(() => {
        this.alertify.success('Новый администратор зарегистрирован');
      }, error => {
        this.alertify.error(error);
      }, () => {
          this.router.navigate(['/admin/admins']);          
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
