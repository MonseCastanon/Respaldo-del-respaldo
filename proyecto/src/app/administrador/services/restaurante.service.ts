import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { enviroments } from '../../../enviroments/enviroments';import { Restaurante } from "../interfaces/restaurante.interface";


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
  getSuggestions( query: string ):Observable<Restaurante[]>{
    return this.httpClient.get<Restaurante[]>(`${this.baseUrl}/restaurantes?q=${ query }&_limit=6`);
  }

  addRestaurante( restaurante:Restaurante):Observable<Restaurante> {
    return this.httpClient.post<Restaurante>(`${this.baseUrl}/restaurantes`, restaurante);
  }

  updateRestaurante( restaurante:Restaurante):Observable<Restaurante> {
    if (!restaurante.id) throw Error('Restaurante id is required');

    return this.httpClient.patch<Restaurante>(`${ this.baseUrl }/restaurantes/${restaurante.id}`, restaurante);
  }


  deleteRestauranteById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/restaurantes/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),

    );
  }

}
