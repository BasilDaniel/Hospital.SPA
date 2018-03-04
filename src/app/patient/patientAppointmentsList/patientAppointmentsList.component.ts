import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patientAppointmentsList',
  templateUrl: './patientAppointmentsList.component.html',
  styleUrls: ['./patientAppointmentsList.component.css']
})
export class PatientAppointmentsListComponent implements OnInit {
  
  PatientAppointmentsList: PatientAppointmentsList[];

  constructor() { }

  ngOnInit() {
  }

}
