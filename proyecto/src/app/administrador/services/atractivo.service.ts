import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { enviroments } from "../../../enviroments/enviroments";
import { Atractivo } from "../interfaces/atractivo.interface";

@Injectable({ providedIn: "root" })
export class AtractivosService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAtractivos(): Observable<Atractivo[]> {
    return this.httpClient.get<Atractivo[]>(`${this.baseUrl}/atractivos`);
  }
  getAtractivoById( id: string): Observable<Atractivo|undefined>{
    return this.httpClient.get<Atractivo>(`${ this.baseUrl }/atractivos/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }
  getSuggestions( query: string ):Observable<Atractivo[]>{
    return this.httpClient.get<Atractivo[]>(`${this.baseUrl}/atractivos?q=${ query }&_limit=6`);
  }

  addAtractivo( atractivo:Atractivo):Observable<Atractivo> {
    return this.httpClient.post<Atractivo>(`${this.baseUrl}/atractivos`, atractivo);
  }

  updateAtractivo( atractivo:Atractivo):Observable<Atractivo> {
    if (!atractivo.id) throw Error('Atractivo id is required');

    return this.httpClient.patch<Atractivo>(`${ this.baseUrl }/atractivos/${atractivo.id}`, atractivo);
  }


  deleteAtractivoById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/atractivos/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),

    );
  }

}
