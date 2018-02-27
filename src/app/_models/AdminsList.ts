import { SharedPositionDetailed } from "./SharedPositionDetailed";
import { SharedDepartmentDetailed } from "./SharedDepartmentDetailed";

export interface AdminsList {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    position?: SharedPositionDetailed;
    department?: SharedDepartmentDetailed;
}