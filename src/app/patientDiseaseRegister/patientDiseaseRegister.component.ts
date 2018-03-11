import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-patientDiseaseRegister',
  templateUrl: './patientDiseaseRegister.component.html',
  styleUrls: ['./patientDiseaseRegister.component.css']
})
export class PatientDiseaseRegisterComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  diseaseId: number;
  patientId: number;
  diseaseName: string;
  diagnosed: Date;
  cured: Date;
  note: string;

  constructor(
    private sharedService: SharedService, 
    private alertify: AlertifyService, 
    private router: Router, 
    private _localeService: BsLocaleService,
    private authService: AuthService) { }

  ngOnInit() {
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green'
    };
    this.sharedService.diseaseIdObservable.subscribe(diseaseId => this.diseaseId = diseaseId);
    this.sharedService.patientIdObservable.subscribe(patientId => this.patientId = patientId);
    this.sharedService.diseaseNameObservable.subscribe(diseaseName => this.diseaseName = diseaseName);
  }

  patientDiseaseRegister() {
    class PatientDiseaseModel {
      diagnosed: Date;
      cured: Date;
      note: string;
      patientId: string;
      diseaseId: string;
      constructor(diagnosed, cured, note, patientId:number, diseaseId:number) {
          this.diagnosed = diagnosed;
          this.cured = cured;
          this.note = note;
          this.patientId = patientId.toString();
          this.diseaseId = diseaseId.toString();
      }
    }
    let patientDiseaseModel = new PatientDiseaseModel(this.diagnosed, this.cured, this.note, this.patientId, this.diseaseId);
    let path = '/' + this.authService.userLoggedIn + '/patient';
        
    this.sharedService.patientDiseaseRegister(patientDiseaseModel).subscribe(() => {
    this.alertify.success('Заболевание зарегистрировано');
    }, error => {
      this.alertify.error('Ошибка, попробуйте в другое время');
    }, () => {
      this.router.navigate([path, this.patientId]);             
    });   
  }

}
