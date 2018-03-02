import { SharedPositionDetailed } from "./SharedPositionDetailed";
import { SharedDepartmentDetailed } from "./SharedDepartmentDetailed";
import { SharedAppointmentsList } from "./SharedAppointmentsList";

export interface SharedStaffDetailed {
    id: number;
    login: string;
    familyName: string;
    name: string;
    middleName: string;
    birthdate: Date;
    appointmentDuration: any;
    position?: SharedPositionDetailed;
    department?: SharedDepartmentDetailed;
    appointments?: SharedAppointmentsList[];
}