import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedPositionDetailed',
  templateUrl: './sharedPositionDetailed.component.html',
  styleUrls: ['./sharedPositionDetailed.component.css']
})
export class SharedPositionDetailedComponent implements OnInit {

  positionDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.positionDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
