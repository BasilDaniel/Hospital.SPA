import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  Staffs: any;

  constructor(private http: Http) { }

  ngOnInit() {
     this.getStaffs();
  }

  getStaffs(){
    this.http.get(environment.apiStaffUrl).subscribe(response => {
      this.Staffs = response.json();
    })
  }

}
