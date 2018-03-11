import { PatientService } from './_services/patient.service';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';

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
import { SharedPatientDetailedResolver } from './_resolvers/sharedPatientDetailed.resolver';
import { AdminDetailedResolver } from './_resolvers/adminDetailed.resolver';
import { SharedStaffDetailedResolver } from './_resolvers/sharedStaffDetailed.resolver';
import { SharedPositionsListResolver } from './_resolvers/sharedPositionsList.resolver';
import { SharedDepartmentsListResolver } from './_resolvers/sharedDepartmentsList.resolver';
import { SharedDiseasesListResolver } from './_resolvers/sharedDiseasesList.resolver';
import { SharedAppointmentDetailedResolver } from './_resolvers/sharedAppointmentDetailed.resolver';
import { SharedDepartmentDetailedResolver } from './_resolvers/sharedDepartmentDetailed.resolver';
import { SharedDiseaseDetailedResolver } from './_resolvers/sharedDiseaseDetailed.resolver';
import { SharedPositionDetailedResolver } from './_resolvers/sharedPositionDetailed.resolver';
import { StaffHomeComponent } from './home/staffHome/staffHome.component';
import { AdminHomeComponent } from './home/adminHome/adminHome.component';
import { AdminRegisterComponent } from './adminRegister/adminRegister.component';
import { PatientStaffDetailedResolver } from './_resolvers/patientStaffDetailed.resolver';
import { AppointmentService } from './_services/appointment.service';
import { PatientAppointmentsListComponent } from './patient/patientAppointmentsList/patientAppointmentsList.component';
import { AppointmentRegisterComponent } from './appointmentRegister/appointmentRegister.component';
import { DepartmentRegisterComponent } from './departmentRegister/departmentRegister.component';
import { PositionRegisterComponent } from './positionRegister/positionRegister.component';
import { DiseaseRegisterComponent } from './diseaseRegister/diseaseRegister.component';
import { PatientDiseaseRegisterComponent } from './patientDiseaseRegister/patientDiseaseRegister.component';


@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    NavComponent,
    HomeComponent,
    StaffRegisterComponent,
    PatientRegisterComponent,
    AdminRegisterComponent,
    AdminDetailedComponent,
    AdminsListComponent,
    PatientDetailedComponent,
    PatientStaffDetailedComponent,
    PatientAppointmentsListComponent,
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
    SharedPositionDetailedComponent,
    StaffHomeComponent,
    AdminHomeComponent,
    AdminRegisterComponent,
    AppointmentRegisterComponent,
    DepartmentRegisterComponent,
    PositionRegisterComponent,
    DiseaseRegisterComponent,
    DepartmentRegisterComponent,
    PositionRegisterComponent,
    DiseaseRegisterComponent,
    PatientDiseaseRegisterComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
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
    AppointmentService,
    PatientDetailedResolver,
    SharedStaffsListResolver,
    SharedPatientsListResolver,
    SharedAppointmentsListResolver,
    SharedPatientDetailedResolver,
    AdminsListResolver,
    AdminDetailedResolver,
    SharedStaffDetailedResolver,
    SharedPositionsListResolver,
    SharedDepartmentsListResolver,
    SharedDiseasesListResolver,
    SharedAppointmentDetailedResolver,
    SharedDepartmentDetailedResolver,
    SharedDiseaseDetailedResolver,
    SharedPositionDetailedResolver,
    PatientStaffDetailedResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
