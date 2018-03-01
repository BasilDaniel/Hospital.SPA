import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedDepartmentDetailed',
  templateUrl: './sharedDepartmentDetailed.component.html',
  styleUrls: ['./sharedDepartmentDetailed.component.css']
})
export class SharedDepartmentDetailedComponent implements OnInit {

  departmentDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.departmentDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
