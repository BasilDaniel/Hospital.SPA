import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { PatientDetailedComponent } from './patient/patientDetailed/patientDetailed.component';
import { StaffAuthGuard, PatientAuthGuard, AdminAuthGuard } from './_guards/auth.guard';
import { SharedStaffsListComponent } from './shared/sharedStaffsList/sharedStaffsList.component';
import { SharedStaffDetailedComponent } from './shared/sharedStaffDetailed/sharedStaffDetailed.component';
import { SharedPatientsListComponent } from './shared/sharedPatientsList/sharedPatientsList.component';
import { AdminDetailedComponent } from './admin/adminDetailed/adminDetailed.component';
import { AdminsListComponent } from './admin/adminsList/adminsList.component';
import { SharedAppointmentDetailedComponent } from './shared/sharedAppointmentDetailed/sharedAppointmentDetailed.component';
import { SharedAppointmentsListComponent } from './shared/sharedAppointmentsList/sharedAppointmentsList.component';
import { SharedDepartmentDetailedComponent } from './shared/sharedDepartmentDetailed/sharedDepartmentDetailed.component';
import { SharedDepartmentsListComponent } from './shared/sharedDepartmentsList/sharedDepartmentsList.component';
import { SharedDiseaseDetailedComponent } from './shared/sharedDiseaseDetailed/sharedDiseaseDetailed.component';
import { SharedDiseasesListComponent } from './shared/sharedDiseasesList/sharedDiseasesList.component';
import { SharedPositionDetailedComponent } from './shared/sharedPositionDetailed/sharedPositionDetailed.component';
import { SharedPositionsListComponent } from './shared/sharedPositionsList/sharedPositionsList.component';
import { PatientStaffDetailedComponent } from './patient/patientStaffDetailed/patientStaffDetailed.component';
import { PatientDetailedResolver } from './_resolvers/patientDetailed.resolver';
import { SharedStaffsListResolver } from './_resolvers/sharedStaffsList.resolver';
import { SharedPatientsListResolver } from './_resolvers/sharedPatientsList.resolver';
import { SharedAppointmentsListResolver } from './_resolvers/sharedAppointmentsList.resolver';
import { AdminsListResolver } from './_resolvers/adminsList.resolver';
import { SharedPatientDetailedResolver } from './_resolvers/sharedPatientDetailed.resolver';
import { SharedPatientDetailedComponent } from './shared/sharedPatientDetailed/sharedPatientDetailed.component';
import { AdminDetailedResolver } from './_resolvers/adminDetailed.resolver';
import { SharedStaffDetailedResolver } from './_resolvers/sharedStaffDetailed.resolver';
import { SharePositionsListResolver } from './_resolvers/sharedPositionsList.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    //Patients routes
    {  
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [PatientAuthGuard],
        children: [
            { path: 'patient/patient/:id', component: PatientDetailedComponent, resolve: {user: PatientDetailedResolver}},
            { path: 'patient/staff/:id', component: PatientStaffDetailedComponent},
            { path: 'patient/staffs', component: SharedStaffsListComponent, resolve:{users: SharedStaffsListResolver}}
        ]
    },
    //Staff routes
    {  
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [StaffAuthGuard],
        children: [
            { path: 'staff/staff/:id', component: SharedStaffDetailedComponent, resolve:{users: SharedStaffDetailedResolver}},
            { path: 'staff/staffs', component: SharedStaffsListComponent, resolve:{users: SharedStaffsListResolver}},
            { path: 'staff/patient/:id', component: SharedPatientDetailedComponent, resolve:{users: SharedPatientDetailedResolver}},
            { path: 'staff/patients', component: SharedPatientsListComponent, resolve:{users: SharedPatientsListResolver}},
            { path: 'staff/appointment/:id', component: SharedAppointmentDetailedComponent}            
        ]
    },
    //Admin routes
    {  
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AdminAuthGuard],
        children: [
            { path: 'admin/admin/:id', component: AdminDetailedComponent, resolve:{users: AdminDetailedResolver}},
            { path: 'admin/admins', component: AdminsListComponent, resolve:{users: AdminsListResolver}},
            { path: 'admin/staff/:id', component: SharedStaffDetailedComponent, resolve:{users: SharedStaffDetailedResolver}},
            { path: 'admin/staffs', component: SharedStaffsListComponent, resolve:{users: SharedStaffsListResolver}},
            { path: 'admin/patient/:id', component: SharedPatientDetailedComponent, resolve:{users: SharedPatientDetailedResolver}},
            { path: 'admin/patients', component: SharedPatientsListComponent, resolve:{users: SharedPatientsListResolver}},
            { path: 'admin/appointment/:id', component: SharedAppointmentDetailedComponent},
            { path: 'admin/appointments', component: SharedAppointmentsListComponent, resolve:{users: SharedAppointmentsListResolver}},
            { path: 'admin/department/:id', component: SharedDepartmentDetailedComponent},
            { path: 'admin/departments', component: SharedDepartmentsListComponent},
            { path: 'admin/disease/:id', component: SharedDiseaseDetailedComponent},
            { path: 'admin/diseases', component: SharedDiseasesListComponent},
            { path: 'admin/position/:id', component: SharedPositionDetailedComponent},
            { path: 'admin/positions', component: SharedPositionsListComponent, resolve:{users: SharePositionsListResolver}}            
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
