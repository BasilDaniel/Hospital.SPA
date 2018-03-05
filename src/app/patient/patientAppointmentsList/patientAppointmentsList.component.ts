import { Component, OnInit } from '@angular/core';
import { PatientAppointmentsList } from '../../_models/PatientAppointmentsList';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-patientAppointmentsList',
  templateUrl: './patientAppointmentsList.component.html',
  styleUrls: ['./patientAppointmentsList.component.css']
})
export class PatientAppointmentsListComponent implements OnInit {
  
  patientAppointmentsList: PatientAppointmentsList[];
  userParams: any = {};  
  pagination: Pagination;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor( 
    private fb: FormBuilder,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    this.userParams.dateTime = '';
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green'
    };
  }

  loadAppointments(){
    console.log(this.userParams.dateTime);
  }

}
