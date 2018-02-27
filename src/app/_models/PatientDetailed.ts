import { PatientDiseasesList } from "./PatientDiseasesList";
import { PatientAppointmentsDetailed } from "./PatientAppointmentsDetailed";

export interface PatientDetailed {
    id: number;
    familyName: string;
    name: string;
    middleName: string;
    birthdate: Date;
    patientDiseases?: PatientDiseasesList[];
    appointments?: PatientAppointmentsDetailed[];
}