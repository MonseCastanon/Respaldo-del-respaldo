import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { Itinerario } from "../interfaces/itinerario.interface";
import { catchError, map, Observable, of } from "rxjs";

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
  getSuggestions( query: string ):Observable<Itinerario[]>{
    return this.httpClient.get<Itinerario[]>(`${this.baseUrl}/itinerarios?q=${ query }&_limit=6`);
  }

  addItinerario( itinerario:Itinerario):Observable<Itinerario> {
    console.log(itinerario)
    return this.httpClient.post<Itinerario>(`${this.baseUrl}/itinerarios`, itinerario);
  }


  updateItinerario( itinerario:Itinerario):Observable<Itinerario> {
    if (!itinerario.id) throw Error('Itinerario id is required');

    return this.httpClient.patch<Itinerario>(`${ this.baseUrl }/itinerarios/${itinerario.id}`, itinerario);
  }


  deleteItinerarioById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/itinerarios/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),

    );
  }

}
