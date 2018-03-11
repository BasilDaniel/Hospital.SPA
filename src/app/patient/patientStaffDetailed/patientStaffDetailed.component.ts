import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patientStaffDetailed',
  templateUrl: './patientStaffDetailed.component.html',
  styleUrls: ['./patientStaffDetailed.component.css']
})
export class PatientStaffDetailedComponent implements OnInit {

  patientStaffDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.patientStaffDetailed = data['users'];
      // console.log(this.patientStaffDetailed)
      }, error => {
        this.alertify.error(error);
      });
  }

}
