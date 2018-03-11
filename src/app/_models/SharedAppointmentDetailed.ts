import { SharedStaffsList } from "./SharedStaffsList";
import { SharedPatientsList } from "./SharedPatientsList";

export interface SharedAppointmentDetailed {
    id: number;
    dateTime: any;
    note: string;
    duration: number;
    staff: SharedStaffsList;
    patient: SharedPatientsList;
}