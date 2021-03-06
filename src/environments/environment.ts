// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiPatientUrl: 'http://localhost:5000/api/Patient/',
  apiStaffUrl: 'http://localhost:5000/api/Staff/',
  apiAdminUrl: 'http://localhost:5000/api/Admin/',
  staffAuthUrl: 'http://localhost:5000/api/AuthStaff/',
  patientAuthUrl: 'http://localhost:5000/api/AuthPatient/',
  adminAuthUrl: 'http://localhost:5000/api/AuthAdmin/',
};
