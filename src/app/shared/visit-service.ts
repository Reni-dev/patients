import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getVisits$() {
    const link = this.url + 'visits';
    return this.http.get(link);
  }

  addVisit$(data: any){
    const link = this.url + 'visits';
    return this.http.post(link, data);
  }

  editVisit$(data: any){
    const link = this.url + 'visits/' + data.id;
    return this.http.put(link, data);
  }

  deleteVisit$(id: number){
    const link = this.url + 'visits/' + id;
    return this.http.delete(link);
  }
}
