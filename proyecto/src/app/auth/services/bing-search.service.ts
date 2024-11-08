import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingSearchService {

  private apiUrl = 'https://api.bing.microsoft.com/v7.0/search';
  private apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu clave de API

  constructor(private http: HttpClient) {}

  buscar(termino: string): Observable<any> {
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.apiKey
    });
    const params = { q: termino };

    return this.http.get(this.apiUrl, { headers, params });
  }
}
