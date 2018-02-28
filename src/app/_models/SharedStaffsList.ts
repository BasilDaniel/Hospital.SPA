import { SharedPositionsList } from "./SharedPositionsList";
import { SharedDepartmentsList } from "./SharedDepartmentsList"

export interface SharedStaffsList {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    birthdate: Date;
    position?: SharedPositionsList;
    department?: SharedDepartmentsList;
}