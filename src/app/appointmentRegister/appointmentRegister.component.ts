import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { AppointmentService } from '../_services/appointment.service';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-appointmentRegister',
  templateUrl: './appointmentRegister.component.html',
  styleUrls: ['./appointmentRegister.component.css']
})
export class AppointmentRegisterComponent implements OnInit {
  appointmentToCreateData: any;

  constructor(
    private authService: AuthService, 
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder,
    private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentToCreateData = this.appointmentService.appointmentToCreateData;
    console.log(this.appointmentToCreateData);
  }

  appointmentRegister() {

    class AppointmentModel {
      dateTime: Data;
      staffId: number;
      patientId: number
      constructor(dateTime, staffId, patientId) {
          this.dateTime = dateTime;
          this.staffId = staffId;
          this.patientId = patientId;
      }
    }

    let appointmentModel = new AppointmentModel(
      this.appointmentToCreateData.dateTime, 
      this.appointmentToCreateData.staffId,
      this.appointmentToCreateData.patientId
    )
    console.log(appointmentModel);

    this.appointmentService.register(appointmentModel).subscribe(() => {
    this.alertify.success('Номерок зарегистрирован');
    }, error => {
      this.alertify.error('Ошибка, попробуйте другую дату или время');
    }, () => {
      this.router.navigate(['/patient/patient', this.authService.userId]);             
    });  
  }

}
