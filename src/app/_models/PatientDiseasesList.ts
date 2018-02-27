import { PatientDiseaseDetailed } from "./PatientDiseaseDetailed";

export interface PatientDiseasesList {
    
    diagnosed: Date;
    cured: Date;
    disease: PatientDiseaseDetailed;
}