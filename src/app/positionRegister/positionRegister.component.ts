import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positionRegister',
  templateUrl: './positionRegister.component.html',
  styleUrls: ['./positionRegister.component.css']
})
export class PositionRegisterComponent implements OnInit {
  positionModel: any = {};
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
      responsibility: ['', Validators.required]
    });
  }

  positionRegister() {
    if (this.registerForm.valid){
      this.positionModel = Object.assign({}, this.registerForm.value);
      this.sharedService.positionRegister(this.positionModel).subscribe(() => {
      this.alertify.success('Должность зарегистрирована');
      }, error => {
        this.alertify.error('Ошибка, попробуйте в другое время');
      }, () => {
        this.router.navigate(['/admin/positions']);             
      });
    }
    
  }

}
