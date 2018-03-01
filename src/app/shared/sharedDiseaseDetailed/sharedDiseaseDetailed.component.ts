import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sharedDiseaseDetailed',
  templateUrl: './sharedDiseaseDetailed.component.html',
  styleUrls: ['./sharedDiseaseDetailed.component.css']
})
export class SharedDiseaseDetailedComponent implements OnInit {

  diseaseDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.diseaseDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

}
