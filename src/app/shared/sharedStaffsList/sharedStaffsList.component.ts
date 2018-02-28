import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../_services/patient.service';
import { StaffService } from '../../_services/staff.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { SharedStaffsList } from '../../_models/SharedStaffsList';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-sharedStaffsList',
  templateUrl: './sharedStaffsList.component.html',
  styleUrls: ['./sharedStaffsList.component.css']
})
export class SharedStaffsListComponent implements OnInit {
  sharedStaffsList: SharedStaffsList[];
  pagination: Pagination;
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];

  constructor( 
    private patientService: PatientService,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedStaffsList = data['users'].result;
      this.pagination = data['users'].pagination;
      });
    
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments(){
    this.sharedService.getDepartments()
    .subscribe((data: SharedDepartmentsList[]) => {      
      this.sharedDepartmentsList = data;
    })  
  }

  loadPositions(){
    this.sharedService.getPositions()
    .subscribe((data: SharedPositionsList[]) => {      
      this.sharedPositionsList = data;
    })  
  }

  loadStaffs() {
    this.sharedService.getStaffs(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<SharedStaffsList[]>) => {
        this.sharedStaffsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStaffs();
  }

}
