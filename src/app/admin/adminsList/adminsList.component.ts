import { Component, OnInit } from '@angular/core';
import { AdminsList } from '../../_models/AdminsList';
import { Pagination } from '../../_models/pagination';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../_services/shared.service';
import { AuthService } from '../../_services/auth.service';

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
    private router: Router,
    private authService: AuthService,
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
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/admin';
    this.router.navigate([path, id]);
  }

  AdminRegister(){
    this.router.navigate(['/admin/adminRegister']);
  }
}
