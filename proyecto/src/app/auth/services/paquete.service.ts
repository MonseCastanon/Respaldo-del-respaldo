import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { catchError, Observable, of } from "rxjs";
import { Paquete } from "../interfaces/paquete.interface";

@Injectable({ providedIn: "root" })
export class PaquetesService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getPaquetes(): Observable<Paquete[]> {
    return this.httpClient.get<Paquete[]>(`${this.baseUrl}/paquetes`);
  }
  getPaqueteById( id: string): Observable<Paquete|undefined>{
    return this.httpClient.get<Paquete>(`${ this.baseUrl}/paquetes/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }

}
