import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-sharedPatientDetailed',
  templateUrl: './sharedPatientDetailed.component.html',
  styleUrls: ['./sharedPatientDetailed.component.css']
})
export class SharedPatientDetailedComponent implements OnInit {
  
  sharedPatientDetailed: any;

  constructor(
    private alertify: AlertifyService, 
    private route: ActivatedRoute,
    private authService: AuthService, 
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedPatientDetailed = data['users'];
      }, error => {
        this.alertify.error(error);
      });
  }

  patientUpdate(){

  }

  patientDiseaseRegister(){   
    this.sharedService.setPatientId(this.sharedPatientDetailed.id); 
    let path = '/' + this.authService.userLoggedIn + '/patientDiseaseRegister';
    this.router.navigate([path, {outlets: {'diseases': ['diseases']}}]);
  }

  appointmentRegister(){
    
  }

}
