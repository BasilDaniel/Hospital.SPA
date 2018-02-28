import { PatientService } from './_services/patient.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { StaffComponent } from './staff/staff.component';
import { NavComponent } from './nav/nav.component';
import { PatientDetailedComponent } from './patient/patientDetailed/patientDetailed.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { AlertifyService } from './_services/alertify.service';
import { StaffRegisterComponent } from './staffRegister/staffRegister.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { StaffAuthGuard, PatientAuthGuard, AdminAuthGuard } from './_guards/auth.guard';
import { PatientRegisterComponent } from './patientRegister/patientRegister.component';
import { StaffService } from './_services/staff.service';
import { SharedStaffsListComponent } from './shared/sharedStaffsList/sharedStaffsList.component';
import { SharedStaffDetailedComponent } from './shared/sharedStaffDetailed/sharedStaffDetailed.component';
import { SharedPatientsListComponent } from './shared/sharedPatientsList/sharedPatientsList.component';
import { AdminDetailedComponent } from './admin/adminDetailed/adminDetailed.component';
import { AdminsListComponent } from './admin/adminsList/adminsList.component';
import { PatientStaffDetailedComponent } from './patient/patientStaffDetailed/patientStaffDetailed.component';
import { SharedPatientDetailedComponent } from './shared/sharedPatientDetailed/sharedPatientDetailed.component';
import { SharedAppointmentsListComponent } from './shared/sharedAppointmentsList/sharedAppointmentsList.component';
import { SharedAppointmentDetailedComponent } from './shared/sharedAppointmentDetailed/sharedAppointmentDetailed.component';
import { SharedDepartmentsListComponent } from './shared/sharedDepartmentsList/sharedDepartmentsList.component';
import { SharedDepartmentDetailedComponent } from './shared/sharedDepartmentDetailed/sharedDepartmentDetailed.component';
import { SharedDiseasesListComponent } from './shared/sharedDiseasesList/sharedDiseasesList.component';
import { SharedDiseaseDetailedComponent } from './shared/sharedDiseaseDetailed/sharedDiseaseDetailed.component';
import { SharedPositionsListComponent } from './shared/sharedPositionsList/sharedPositionsList.component';
import { SharedPositionDetailedComponent } from './shared/sharedPositionDetailed/sharedPositionDetailed.component';
import { PatientDetailedResolver } from './_resolvers/patientDetailed.resolver';
import { SharedStaffsListResolver } from './_resolvers/sharedStaffsList.resolver';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { SharedService } from './_services/shared.service';
import { SharedPatientsListResolver } from './_resolvers/sharedPatientsList.resolver';
import { SharedAppointmentsListResolver } from './_resolvers/sharedAppointmentsList.resolver';
import { AdminService } from './_services/admin.service';
import { AdminsListResolver } from './_resolvers/adminsList.resolver';


@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    NavComponent,
    HomeComponent,
    StaffRegisterComponent,
    PatientRegisterComponent,
    AdminDetailedComponent,
    AdminsListComponent,
    PatientDetailedComponent,
    PatientStaffDetailedComponent,
    SharedStaffsListComponent,
    SharedStaffDetailedComponent,
    SharedPatientsListComponent,
    SharedPatientDetailedComponent,
    SharedAppointmentsListComponent,
    SharedAppointmentDetailedComponent,
    SharedDepartmentsListComponent,
    SharedDepartmentDetailedComponent,
    SharedDiseasesListComponent,
    SharedDiseaseDetailedComponent,
    SharedPositionsListComponent,
    SharedPositionDetailedComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    PaginationModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    StaffAuthGuard,
    PatientAuthGuard,
    AdminAuthGuard,
    PatientService,
    StaffService,
    SharedService,
    AdminService,
    PatientDetailedResolver,
    SharedStaffsListResolver,
    SharedPatientsListResolver,
    SharedAppointmentsListResolver,
    AdminsListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
