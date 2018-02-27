import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

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
    this.http.get('http://localhost:5000/api/Staff').subscribe(response => {
      this.Staffs = response.json();
    })
  }

}
