import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../_services/shared.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diseaseRegister',
  templateUrl: './diseaseRegister.component.html',
  styleUrls: ['./diseaseRegister.component.css']
})
export class DiseaseRegisterComponent implements OnInit {
  diseaseModel: any = {};
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

  diseaseRegister() {
    if (this.registerForm.valid){
      this.diseaseModel = Object.assign({}, this.registerForm.value);
      this.sharedService.diseaseRegister(this.diseaseModel).subscribe(() => {
      this.alertify.success('Заболевание зарегистрировано');
      }, error => {
        this.alertify.error('Ошибка, попробуйте в другое время');
      }, () => {
        this.router.navigate(['/admin/diseases']);             
      });
    }
    
  }

}
