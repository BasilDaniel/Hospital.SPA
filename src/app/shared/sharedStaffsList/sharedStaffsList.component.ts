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
import { Router } from '@angular/router';

@Component({
  selector: 'app-sharedStaffsList',
  templateUrl: './sharedStaffsList.component.html',
  styleUrls: ['./sharedStaffsList.component.css']
})
export class SharedStaffsListComponent implements OnInit {
  sharedStaffsList: SharedStaffsList[];
  pagination: Pagination;
  userParams: any = {};
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];

  constructor( 
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedStaffsList = data['users'].result;
      this.pagination = data['users'].pagination;
      });
    
    this.loadDepartments();
    this.loadPositions();

    this.userParams.name = '';
    this.userParams.department = '';
    this.userParams.position = '';
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/staff';
    this.router.navigate([path, id]);
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

  loadStaffs() {
    this.sharedService.getStaffsList(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<SharedStaffsList[]>) => {
        this.sharedStaffsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  resetFilters() {
    this.userParams.name = '';
    this.userParams.department = '';
    this.userParams.position = '';
    this.loadStaffs();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadStaffs();
  }

}
