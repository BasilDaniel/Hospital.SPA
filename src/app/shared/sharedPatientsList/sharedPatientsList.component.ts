import { Component, OnInit } from '@angular/core';
import { SharedPatientsList } from '../../_models/SharedPatientsList';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-sharedPatientsList',
  templateUrl: './sharedPatientsList.component.html',
  styleUrls: ['./sharedPatientsList.component.css']
})
export class SharedPatientsListComponent implements OnInit {
  sharedPatientsList: SharedPatientsList[];
  pagination: Pagination;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedPatientsList = data['users'].result;
      this.pagination = data['users'].pagination;
      })
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/patient';
    this.router.navigate([path, id]);
  }

  loadPatients() {
    this.sharedService.getPatientsList(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<SharedPatientsList[]>) => {
        this.sharedPatientsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPatients();
  }

}
