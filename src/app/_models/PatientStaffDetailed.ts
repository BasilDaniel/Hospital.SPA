import { SharedPositionsList } from "./SharedPositionsList";
import { SharedDepartmentsList } from "./SharedDepartmentsList";
import { PatientStaffAppointmentsDetailed } from "./PatientStaffAppointmentsDetailed";

export interface PatientStaffDetailed {
    familyName: string;
    name: string;
    middleName: string;
    position?: SharedPositionsList;
    department?: SharedDepartmentsList;
    appointments?: PatientStaffAppointmentsDetailed[];
}