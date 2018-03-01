import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedPatientDetailed',
  templateUrl: './sharedPatientDetailed.component.html',
  styleUrls: ['./sharedPatientDetailed.component.css']
})
export class SharedPatientDetailedComponent implements OnInit {
  
  sharedPatientDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedPatientDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
