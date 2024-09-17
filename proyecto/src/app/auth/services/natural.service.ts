import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { Natural } from "../interfaces/natural.interface";
import { catchError, Observable, of } from "rxjs";


@Injectable({ providedIn: "root" })
export class NaturalesService {
  /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getNaturales(): Observable<Natural[]> {
    return this.httpClient.get<Natural[]>(`${this.baseUrl}/naturales`);
  }
  getNaturalById( id: string): Observable<Natural|undefined>{
    return this.httpClient.get<Natural>(`${ this.baseUrl}/naturales/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }

}
