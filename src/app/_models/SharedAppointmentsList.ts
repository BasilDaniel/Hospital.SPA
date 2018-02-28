import { SharedStaffsList } from "./SharedStaffsList";

export interface SharedAppointmentsList {
    id: number;
    dateTime: any;
    duration: any;
    staff: SharedStaffsList;
}