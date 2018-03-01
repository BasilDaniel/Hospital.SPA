import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedAppointmentDetailed',
  templateUrl: './sharedAppointmentDetailed.component.html',
  styleUrls: ['./sharedAppointmentDetailed.component.css']
})
export class SharedAppointmentDetailedComponent implements OnInit {
  
  appointmentDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.appointmentDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
