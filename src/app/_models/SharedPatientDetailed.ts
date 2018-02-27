import { SharedPatientDiseasesList } from "./SharedPatientDiseasesList";
import { SharedAppointmentDetailed } from "./SharedAppointmentDetailed";

export interface SharedPatientDetailed {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    birthdate: Date;
    patientDiseases?: SharedPatientDiseasesList;
    appointments?: SharedAppointmentDetailed;
}