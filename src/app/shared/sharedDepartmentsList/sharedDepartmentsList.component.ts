import { Component, OnInit } from '@angular/core';
import { SharedDepartmentsList } from '../../_models/SharedDepartmentsList';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-sharedDepartmentsList',
  templateUrl: './sharedDepartmentsList.component.html',
  styleUrls: ['./sharedDepartmentsList.component.css']
})
export class SharedDepartmentsListComponent implements OnInit {
  sharedDepartmentsList: SharedDepartmentsList[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedDepartmentsList = data['users'];
      });
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/department';
    this.router.navigate([path, id]);
  }

}
