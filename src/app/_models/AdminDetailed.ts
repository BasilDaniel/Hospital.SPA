import { SharedPositionDetailed } from "./SharedPositionDetailed";
import { SharedDepartmentDetailed } from "./SharedDepartmentDetailed";

export interface AdminDetailed {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    birthdate: Date;
    position?: SharedPositionDetailed;
    department?: SharedDepartmentDetailed;
}