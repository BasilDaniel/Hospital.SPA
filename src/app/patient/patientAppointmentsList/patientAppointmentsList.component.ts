import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
import { AuthService } from '../../_services/auth.service';

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
    private router: Router,
    private _localeService: BsLocaleService,
    private appointmentService: AppointmentService,
    private alertify: AlertifyService,
    private authService: AuthService) { }

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
        // console.log(this.appointmentListToDisplay);
      }, error => {
        this.alertify.error(error);
      });    
  }

  dayModelCreate(
      workingHourStart: number = 9, 
      workingHourEnd: number = 18, 
      workingHourBreakStart: number = 12,
      workingHourBreakEnd: number = 13, 
      appointmentDuration: any = this.patientStaffDetailed.appointmentDuration
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
        isOpenBoolean: boolean
        constructor(year, month, day, hour, minutes, isOpen: string, isOpenBoolean: boolean) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.hour = hour;
            this.minutes = minutes;
            this.isOpen = isOpen;
            this.isOpenBoolean = isOpenBoolean;
        }
      } 
      
      class DayAppointmentToDisplay {
        dateTime: Date;
        isOpen: string;
        isOpenBoolean: boolean
        constructor(dateTime, isOpen: string, isOpenBoolean: boolean) {
            this.dateTime = dateTime;
            this.isOpen = isOpen;
            this.isOpenBoolean = isOpenBoolean;
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
            'Занято',
            false);

        if(timeCounter.getHours() < workingHourBreakStart || timeCounter.getHours() >= workingHourBreakEnd){
          // console.log('ПРИЕМ ' + timeCounter);
          dayAppointment.isOpen = 'Свободно';
          dayAppointment.isOpenBoolean = true;
          for(let patientAppointment of this.patientAppointmentsList){
            let date = new Date(Date.parse(patientAppointment.dateTime));

            if(date.getHours() == timeCounter.getHours() && 
            date.getMinutes() == timeCounter.getMinutes())
            {
              dayAppointment.isOpen = 'Занято';
              dayAppointment.isOpenBoolean = false;
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
        let isOpenBoolean = dayModel[i].isOpenBoolean;

        let appointment = new DayAppointmentToDisplay(dateTime, isOpen, isOpenBoolean)

        dayModelToReturn.push(appointment);
      }
    console.log(dayModelToReturn);
      
    return dayModelToReturn;
  }

  createAppointment(item){

    let dateTime = new Date(item.dateTime);
    let isOpenBoolean = item.isOpenBoolean;
    // console.log('LocaleString ' + dateTime.toLocaleString());
    // console.log('UTCString ' + dateTime.toUTCString());
    // console.log('ISOString ' + dateTime.toISOString());
    // console.log('String ' + dateTime.toString());

    class AppointmentToCreateData {
      dateTime;
      staffFamilyName: string;
      staffName: string;
      staffMiddleName: string;
      staffId: number;
      patientId: number;
      staffDepartment: string;
      staffPosition: string;

      constructor(dateTime, staffFamilyName, staffName, staffMiddleName, staffDepartment, staffPosition, staffId, patientId) {
          this.dateTime = dateTime;
          this.staffFamilyName = staffFamilyName;
          this.staffName = staffName;
          this.staffMiddleName = staffMiddleName;
          this.staffId = staffId;
          this.patientId = patientId;
          this.staffDepartment = staffDepartment;
          this.staffPosition = staffPosition;
      }
    }
    if(isOpenBoolean == true){
      this.appointmentService.appointmentToCreateData = 
      new AppointmentToCreateData(
        dateTime, 
        this.patientStaffDetailed.familyName, 
        this.patientStaffDetailed.name,
        this.patientStaffDetailed.middleName,
        this.patientStaffDetailed.department.name,
        this.patientStaffDetailed.position.name,
        this.patientStaffDetailed.id,
        this.authService.userId,);

      this.router.navigate(['/patient/appointmentRegister']);
      console.log(this.appointmentService.appointmentToCreateData.dateTime)
    }
    else{
      console.log('appointment NOT created')
    }
    // let appointmentToCreateData = new AppointmentToCreateData();
    // console.log('appointment created ' + dateTime)
  }

}
