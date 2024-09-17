import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
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
}
