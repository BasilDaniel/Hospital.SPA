import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedStaffDetailed',
  templateUrl: './sharedStaffDetailed.component.html',
  styleUrls: ['./sharedStaffDetailed.component.css']
})
export class SharedStaffDetailedComponent implements OnInit {

  sharedStaffDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedStaffDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
