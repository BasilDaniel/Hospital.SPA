import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentService {
    appointmentDurations = [
        {
          "placeholder": "5 минут",
          "data": "00:05:00"
        }, 
        {
          "placeholder": "10 минут",
          "data": "00:10:00"
        },
        {
          "placeholder": "15 минут",
          "data": "00:15:00"
        },
         {
          "placeholder": "20 минут",
          "data": "00:20:00"
        },
        {
          "placeholder": "25 минут",
          "data": "00:25:00"
        }, 
        {
          "placeholder": "30 минут",
          "data": "00:30:00"
        }
      ]

constructor() { }

}