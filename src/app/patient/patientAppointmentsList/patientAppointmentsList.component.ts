import { Component, OnInit, Input } from '@angular/core';
import { PatientAppointmentsList } from '../../_models/PatientAppointmentsList';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
import { AppointmentService } from '../../_services/appointment.service';
import { AlertifyService } from '../../_services/alertify.service';
import { DateInput } from 'ngx-bootstrap/chronos/test/chain';
import { DateFormatter } from 'ngx-bootstrap/datepicker/date-formatter';
import { DateFormatterFn } from 'ngx-bootstrap/chronos/types';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-patientAppointmentsList',
  templateUrl: './patientAppointmentsList.component.html',
  styleUrls: ['./patientAppointmentsList.component.css']
})
export class PatientAppointmentsListComponent implements OnInit {
  
  patientAppointmentsList: PatientAppointmentsList[];
  appointmentListToDisplay = [];
  userParams: any = {};  
  pagination: Pagination;
  bsConfig: Partial<BsDatepickerConfig>;
  @Input() patientStaffDetailed: any;
  dateTime: Date;

  constructor( 
    private _localeService: BsLocaleService,
    private appointmentService: AppointmentService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.userParams.dateTime = '';
    this.userParams.staffId = '';
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green',
      showWeekNumbers: false,
      dateInputFormat: "DD-MM-YYYY"
    };    
  }

  loadDailyAppointments() {
    this.userParams.dateTime = this.dateTime.toISOString();
    this.userParams.staffId = this.patientStaffDetailed.id;
    this.appointmentService.getAppointmentsList(1, 300, this.userParams)
      .subscribe((res: PaginatedResult<PatientAppointmentsList[]>) => {
        this.patientAppointmentsList = res.result;
        this.pagination = res.pagination;
        // console.log(this.patientAppointmentsList);
        this.appointmentListToDisplay = this.dayModelCreate();
        console.log(this.appointmentListToDisplay);
      }, error => {
        this.alertify.error(error);
      });    
  }

  dayModelCreate(
      workingHourStart: number = 9, 
      workingHourEnd: number = 18, 
      workingHourBreakStart: number = 12,
      workingHourBreakEnd: number = 13, 
      appointmentDuration: number = 20
    ){
      let timeCounter = this.dateTime;
      timeCounter.setHours(workingHourStart, 0, 0);
      let dayModel = [];
      let dayModelToReturn = [];

      class DayAppointment {
        day: any;
        month: any;
        year: any;
        hour: any;
        minutes: any;
        isOpen: string;
        constructor(year, month, day, hour, minutes, isOpen: string) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.hour = hour;
            this.minutes = minutes;
            this.isOpen = isOpen;
        }
      } 
      
      class DayAppointmentToDisplay {
        dateTime: any;
        isOpen: string;
        constructor(dateTime, isOpen: string) {
            this.dateTime = dateTime;
            this.isOpen = isOpen;
        }
      }

      while(timeCounter.getHours() < workingHourEnd){

        let dayAppointment = new DayAppointment
          (
            timeCounter.getFullYear(), 
            timeCounter.getMonth(),
            timeCounter.getDate(),
            timeCounter.getHours(), 
            timeCounter.getMinutes(),
            'Занято');

        if(timeCounter.getHours() < workingHourBreakStart || timeCounter.getHours() >= workingHourBreakEnd){
          // console.log('ПРИЕМ ' + timeCounter);
          dayAppointment.isOpen = 'Свободно';
          for(let patientAppointment of this.patientAppointmentsList){
            let date = new Date(Date.parse(patientAppointment.dateTime));

            if(date.getHours() == timeCounter.getHours() && 
            date.getMinutes() == timeCounter.getMinutes())
            {
              dayAppointment.isOpen = 'Занято';
            }
          }
          
          dayModel.push(dayAppointment);
          // console.log(dayAppointment); 
        }
        else{
          // console.log('ПЕРЕРЫВ ' + timeCounter);
          // console.log(dayAppointment);
        }

        timeCounter.setMinutes(timeCounter.getMinutes() + appointmentDuration)
      }
        
      for(let i=0; i < dayModel.length; i++){
        
        let dateTime = new Date(
          dayModel[i].year, 
          dayModel[i].month, 
          dayModel[i].day, 
          dayModel[i].hour, 
          dayModel[i].minutes
        )

        let isOpen = dayModel[i].isOpen;

        let appointment = new DayAppointmentToDisplay(dateTime, isOpen)

        dayModelToReturn.push(appointment);
      }
      
    return dayModelToReturn;
  }

}
