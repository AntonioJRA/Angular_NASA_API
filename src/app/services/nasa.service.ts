import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  // private apiKey = '7ttmEvH5tBG0GhqwggMXtkaxEFuRTVh7wjmNG0Ye'; //
  private apiKey = '1dUUiWQfo8CpB6Qj2QAOK5ArZUOJmnHGAxdpT3c0';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    // Calcular fecha de inicio (hoy - 6 días)
    const today = new Date();
    const pastDate = new Date(today)
    pastDate.setDate(today.getDate() - 5)
    // Formato YYYY-MM-DD
    const startDate = pastDate.toISOString().split('T')[0]

    const params = new HttpParams().set('api_key', this.apiKey).set('start_date', startDate);

    return this.http.get(this.apiUrl, { params });
  }

  getDatosBeetweenDates(startDate:string, endDate:string): Observable<any>{
    let params;
    if (startDate === endDate) {
      params = new HttpParams().set('api_key', this.apiKey).set('start_date', startDate);
    } else {
      params = new HttpParams().set('api_key', this.apiKey).set('start_date', startDate).set('end_date', endDate);
    }
    return this.http.get(this.apiUrl, { params });
  }

  getDatosCount(count:number): Observable<any>{
    const params = new HttpParams().set('api_key', this.apiKey).set('count', count);    
    return this.http.get(this.apiUrl, { params });
  }
}
