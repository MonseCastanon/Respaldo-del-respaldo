import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { enviroments } from "../../../enviroments/enviroments";
import { Agencia } from "../interfaces/agencia.interface";

@Injectable({ providedIn: "root" })
export class AgenciasService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getAgencias(): Observable<Agencia[]> {
    return this.httpClient.get<Agencia[]>(`${this.baseUrl}/agencias`);
  }
  getAgenciaById( id: string): Observable<Agencia|undefined>{
    return this.httpClient.get<Agencia>(`${ this.baseUrl}/agencias/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }

}
