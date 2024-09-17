import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Agencia } from "../interfaces/agencia.interface";

@Injectable({ providedIn: "root" })
export class AgenciasService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAgencias(): Observable<Agencia[]> {
    return this.httpClient.get<Agencia[]>(`${this.baseUrl}/agencias`);
  }
  getAgenciaById( id: string): Observable<Agencia|undefined>{
    return this.httpClient.get<Agencia>(`${ this.baseUrl }/agencias/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }
  getSuggestions( query: string ):Observable<Agencia[]>{
    return this.httpClient.get<Agencia[]>(`${this.baseUrl}/agencias?q=${ query }&_limit=6`);
  }

  addAgencia( agencia:Agencia):Observable<Agencia> {
    return this.httpClient.post<Agencia>(`${this.baseUrl}/agencias`, agencia);
  }

  updateAgencia( agencia:Agencia):Observable<Agencia> {
    if (!agencia.id) throw Error('Agencia id is required');

    return this.httpClient.patch<Agencia>(`${ this.baseUrl }/agencias/${agencia.id}`, agencia);
  }


  deleteAgenciaById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/agencias/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),

    );
  }

}
