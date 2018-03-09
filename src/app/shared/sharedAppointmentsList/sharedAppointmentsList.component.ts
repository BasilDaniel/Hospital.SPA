import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { SharedAppointmentsList } from '../../_models/SharedAppointmentsList';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';
import { AuthService } from '../../_services/auth.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-sharedAppointmentsList',
  templateUrl: './sharedAppointmentsList.component.html',
  styleUrls: ['./sharedAppointmentsList.component.css']
})
export class SharedAppointmentsListComponent implements OnInit {
  dateTime: Date;
  department = '';
  position = '';
  sharedAppointmentsList: SharedAppointmentsList[];
  pagination: Pagination;  
  userParams: any = {};
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];
  bsConfig: Partial<BsDatepickerConfig>;

  constructor( 
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    defineLocale('ru', ruLocale);
    this._localeService.use('ru');
    this.bsConfig = {
      containerClass: 'theme-green',
      showWeekNumbers: false,
      dateInputFormat: "DD-MM-YYYY"
    };

    this.route.data.subscribe(data => {
      this.sharedAppointmentsList = data['users'].result;
      this.pagination = data['users'].pagination;
      }, error => {
        this.alertify.error(error);
      });
    
    this.loadDepartments();
    this.loadPositions();
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/appointment';
    this.router.navigate([path, id]);
  }

  loadDepartments(){
    this.sharedService.getDepartmentsList()
    .subscribe((data: SharedDepartmentsList[]) => {      
      this.sharedDepartmentsList = data;
    }, error => {
      this.alertify.error(error);
    })  
  }

  loadPositions(){
    this.sharedService.getPositionsList()
    .subscribe((data: SharedPositionsList[]) => {      
      this.sharedPositionsList = data;
    }, error => {
      this.alertify.error(error);
    })  
  }

  getAppointmentsWithParams(){       
    this.userParams.dateTime = this.dateTime;

    if(this.dateTime != null)
    this.userParams.dateTime= this.userParams.dateTime.toISOString();

    this.userParams.department = this.department;
    this.userParams.position = this.position;
    this.loadAppointments()
  }

  loadAppointments() {
    this.sharedService.getAppointmentsList(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<SharedAppointmentsList[]>) => {
        this.sharedAppointmentsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  resetFilters() {
    this.userParams.dateTime = null;
    this.userParams.department = '';
    this.userParams.position = '';
    
    this.dateTime = null;
    this.department = '';
    this.position = '';
    this.loadAppointments();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getAppointmentsWithParams();
  }

}
