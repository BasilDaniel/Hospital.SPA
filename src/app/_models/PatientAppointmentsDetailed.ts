import { SharedStaffsList } from "./SharedStaffsList"

export interface PatientAppointmentsDetailed {
    dateTime: Date;
    staff: SharedStaffsList;
}