import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() idTransmit = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedDiseasesList = data['users'].result;
      this.pagination = data['users'].pagination;
      }, error => {
        this.alertify.error(error);
      });

      this.userParams.name = '';
  }

  activateNewDiseaseButton(){
    if(this.authService.userLoggedIn == 'admin'){
      if(this.route.snapshot.routeConfig.path == 'diseases')
      return false;

      return true;
    }

    return false;
    
  }

  clickToItem(id, name){
    if(this.route.snapshot.routeConfig.path == 'diseases'){
      this.sharedService.setDiseaseId(id);
      this.sharedService.setDiseaseName(name);
    }
    else{
      let path = '/' + this.authService.userLoggedIn + '/disease';
    this.router.navigate([path, id]);
    }
    
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

  diseaseRegister(){
    this.router.navigate(['/admin/diseaseRegister']);
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
