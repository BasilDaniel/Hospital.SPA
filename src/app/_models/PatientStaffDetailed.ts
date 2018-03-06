import { SharedPositionsList } from "./SharedPositionsList";
import { SharedDepartmentsList } from "./SharedDepartmentsList";
import { PatientStaffAppointmentsDetailed } from "./PatientStaffAppointmentsDetailed";
import { Time } from "ngx-bootstrap/timepicker/timepicker.models";

export interface PatientStaffDetailed {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    appointmentDuration: Time;
    position?: SharedPositionsList;
    department?: SharedDepartmentsList;
    appointments?: PatientStaffAppointmentsDetailed[];
}