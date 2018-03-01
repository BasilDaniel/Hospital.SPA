import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminDetailed',
  templateUrl: './adminDetailed.component.html',
  styleUrls: ['./adminDetailed.component.css']
})
export class AdminDetailedComponent implements OnInit {

  adminDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adminDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
