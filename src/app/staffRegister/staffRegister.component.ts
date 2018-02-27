import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffRegister',
  templateUrl: './staffRegister.component.html',
  styleUrls: ['./staffRegister.component.css']
})
export class StaffRegisterComponent implements OnInit {
  staffModel: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  StaffRegister() {
    const user = 'staff';
    this.authService.register(this.staffModel, user).subscribe(() => {
      this.alertify.success('Вы зарегистрированы');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/staff/staffs']);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
