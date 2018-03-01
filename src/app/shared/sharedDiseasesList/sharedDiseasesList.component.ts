import { Component, OnInit } from '@angular/core';
import { SharedDiseasesList } from '../../_models/SharedDiseasesList';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { AuthService } from '../../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-sharedDiseasesList',
  templateUrl: './sharedDiseasesList.component.html',
  styleUrls: ['./sharedDiseasesList.component.css']
})
export class SharedDiseasesListComponent implements OnInit {
  sharedDiseasesList: SharedDiseasesList[];
  pagination: Pagination;
  userParams: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedDiseasesList = data['users'].result;
      this.pagination = data['users'].pagination;
      });

      this.userParams.name = '';
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/disease';
    this.router.navigate([path, id]);
  }

  loadDiseases() {
    this.sharedService.getDiseasesList(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<SharedDiseasesList[]>) => {
        this.sharedDiseasesList = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  resetFilters() {
    this.userParams.name = '';
    this.loadDiseases();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadDiseases();
  }

}
