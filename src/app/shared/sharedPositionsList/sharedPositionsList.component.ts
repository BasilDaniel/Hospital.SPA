import { Component, OnInit } from '@angular/core';
import { SharedPositionsList } from '../../_models/SharedPositionsList';
import { SharedService } from '../../_services/shared.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-sharedPositionsList',
  templateUrl: './sharedPositionsList.component.html',
  styleUrls: ['./sharedPositionsList.component.css']
})
export class SharedPositionsListComponent implements OnInit {
  sharedPositionsList: SharedPositionsList[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sharedPositionsList = data['users'];
      });
  }

  linkToUser(id){
    let path = '/' + this.authService.userLoggedIn + '/position';
    this.router.navigate([path, id]);
  }

}
