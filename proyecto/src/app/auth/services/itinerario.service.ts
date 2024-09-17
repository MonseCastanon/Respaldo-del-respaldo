import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, map } from "rxjs";
import { enviroments } from "../../../enviroments/enviroments";
import { Itinerario } from "../interfaces/itinerario.interface";

@Injectable({ providedIn: "root" })
export class ItinerariosService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getItinerarios(): Observable<Itinerario[]> {
    return this.httpClient.get<Itinerario[]>(`${this.baseUrl}/itinerarios`);
  }
  getItinerarioById( id: string): Observable<Itinerario|undefined>{
    return this.httpClient.get<Itinerario>(`${ this.baseUrl}/itinerarios/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }
}
