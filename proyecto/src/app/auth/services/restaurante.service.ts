import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { Restaurante } from "../interfaces/restaurante.interface";
import { catchError, Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class RestaurantesService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getRestaurantes(): Observable<Restaurante[]> {
    return this.httpClient.get<Restaurante[]>(`${this.baseUrl}/restaurantes`);
  }
  getRestauranteById( id: string): Observable<Restaurante|undefined>{
    return this.httpClient.get<Restaurante>(`${ this.baseUrl}/restaurantes/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }
}
