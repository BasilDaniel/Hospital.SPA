import { Component, OnInit } from '@angular/core';
import { AdminsList } from '../../_models/AdminsList';
import { Pagination } from '../../_models/pagination';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-adminsList',
  templateUrl: './adminsList.component.html',
  styleUrls: ['./adminsList.component.css']
})
export class AdminsListComponent implements OnInit {
  adminsList: AdminsList[];
  sharedDepartmentsList: SharedDepartmentsList[];
  sharedPositionsList: SharedPositionsList[];

  constructor(
    private adminService: AdminService,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.adminsList = data['users'];
      console.log(this.adminsList);
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

  loadAdmins() {
    this.adminService.getAdminsList()
      .subscribe((res: AdminsList[]) => {
        this.adminsList = res;
      }, error => {
        this.alertify.error(error);
      });
  }

}
