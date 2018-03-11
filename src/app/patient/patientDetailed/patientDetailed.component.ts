import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../_services/auth.service';
import { PatientService } from '../../_services/patient.service';
import { StaffService } from '../../_services/staff.service';
import { AlertifyService } from '../../_services/alertify.service';
import { PatientDetailed } from '../../_models/PatientDetailed';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patientDetailed',
  templateUrl: './patientDetailed.component.html',
  styleUrls: ['./patientDetailed.component.css']
})
export class PatientDetailedComponent implements OnInit {

  patientDetailed: any;

  constructor( 
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.patientDetailed = data['user'];
      
      // console.log(this.patientDetailed.appointments);
      }, error => {
        this.alertify.error(error);
      });
  }

}
