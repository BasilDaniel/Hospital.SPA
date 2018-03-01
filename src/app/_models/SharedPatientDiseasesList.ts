import { SharedDiseaseDetailed } from "./SharedDiseaseDetailed";

export interface SharedPatientDiseasesList {
    
    diagnosed: Date;
    cured: Date;
    disease: SharedDiseaseDetailed;
}