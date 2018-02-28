import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { SharedAppointmentsList } from '../../_models/SharedAppointmentsList';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';

@Component({
  selector: 'app-sharedAppointmentsList',
  templateUrl: './sharedAppointmentsList.component.html',
  styleUrls: ['./sharedAppointmentsList.component.css']
})
export class SharedAppointmentsListComponent implements OnInit {
  sharedAppointmentsList: SharedAppointmentsList[];
  pagination: Pagination;
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];

  constructor( 
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedAppointmentsList = data['users'].result;
      this.pagination = data['users'].pagination;
      });
    
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments(){
    this.sharedService.getDepartmentsList()
    .subscribe((data: SharedDepartmentsList[]) => {      
      this.sharedDepartmentsList = data;
    })  
  }

  loadPositions(){
    this.sharedService.getPositionsList()
    .subscribe((data: SharedPositionsList[]) => {      
      this.sharedPositionsList = data;
    })  
  }

  loadAppointments() {
    this.sharedService.getAppointmentsList(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<SharedAppointmentsList[]>) => {
        this.sharedAppointmentsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAppointments();
  }

}
