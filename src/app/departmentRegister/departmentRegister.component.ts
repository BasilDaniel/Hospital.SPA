import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-departmentRegister',
  templateUrl: './departmentRegister.component.html',
  styleUrls: ['./departmentRegister.component.css']
})
export class DepartmentRegisterComponent implements OnInit {
  departmentModel: any = {};
  registerForm: FormGroup;

  constructor(
    private sharedService: SharedService, 
    private alertify: AlertifyService, 
    private router: Router, 
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  departmentRegister() {
    if (this.registerForm.valid){
      this.departmentModel = Object.assign({}, this.registerForm.value);
      this.sharedService.departmentRegister(this.departmentModel).subscribe(() => {
      this.alertify.success('Отделение зарегистрировано');
      }, error => {
        this.alertify.error('Ошибка, попробуйте в другое время');
      }, () => {
        this.router.navigate(['/admin/departments']);             
      });
    }
    
  }

}
