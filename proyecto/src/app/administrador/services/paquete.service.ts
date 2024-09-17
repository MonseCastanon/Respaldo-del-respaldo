import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { catchError, map, Observable, of } from "rxjs";
import { Paquete } from "../interfaces/paquete.interface";

@Injectable({ providedIn: "root" })
export class PaquetesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getPaquetes(): Observable<Paquete[]> {
    return this.httpClient.get<Paquete[]>(`${this.baseUrl}/paquetes`);
  }

  getPaqueteById(id: string): Observable<Paquete | undefined> {
    return this.httpClient.get<Paquete>(`${this.baseUrl}/paquetes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Paquete[]> {
    return this.httpClient.get<Paquete[]>(`${this.baseUrl}/paquetes?q=${query}&_limit=6`);
  }

  addPaquete(paquete: Paquete): Observable<Paquete> {
    return this.httpClient.post<Paquete>(`${this.baseUrl}/paquetes`, paquete);
  }

  updatePaquete(paquete: Paquete): Observable<Paquete> {
    if (!paquete.id) throw Error('Paquete id is required');

    return this.httpClient.patch<Paquete>(`${this.baseUrl}/paquetes/${paquete.id}`, paquete);
  }

  deletePaqueteById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/paquetes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false))
      );
  }

  // Métodos para obtener hoteles, restaurantes y experiencias
  getHoteles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/hoteles`)
      .pipe(
        catchError(error => of([]))
      );
  }

  getRestaurantes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/restaurantes`)
      .pipe(
        catchError(error => of([]))
      );
  }

  getExperiencias(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/experiencias`)
      .pipe(
        catchError(error => of([]))
      );
  }
}
