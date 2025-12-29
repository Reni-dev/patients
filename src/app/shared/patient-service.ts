import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getPatients$() {
    const link = this.url + 'patients';
    return this.http.get(link);
  }

  addPatient$(data: any){
    const link = this.url + 'patients';
    return this.http.post(link, data);
  }

  editPatient$(data: any){
    const link = this.url + 'patients/' + data.id;
    return this.http.put(link, data);
  }

  deletePatient$(id: number){
    const link = this.url + 'patients/' + id;
    return this.http.delete(link);
  }
}
