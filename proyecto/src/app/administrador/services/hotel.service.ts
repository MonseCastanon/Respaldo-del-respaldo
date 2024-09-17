import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { enviroments } from '../../../enviroments/enviroments';
import { Hotel } from "../interfaces/hotel.interface";

@Injectable({ providedIn: "root" })
export class HotelesService {    /*Recuerden que lleva 2 "S" */

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getHoteles(): Observable<Hotel[]> {
    return this.httpClient.get<Hotel[]>(`${this.baseUrl}/hoteles`);
  }
  getHotelById( id: string): Observable<Hotel|undefined>{
    return this.httpClient.get<Hotel>(`${ this.baseUrl}/hoteles/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );

  }
  getSuggestions( query: string ):Observable<Hotel[]>{
    return this.httpClient.get<Hotel[]>(`${this.baseUrl}/hoteles?q=${ query }&_limit=6`);
  }

  addHotel( hotel:Hotel):Observable<Hotel> {
    return this.httpClient.post<Hotel>(`${this.baseUrl}/hoteles`, hotel);
  }

  updateHotel( hotel:Hotel):Observable<Hotel> {
    if (!hotel.id) throw Error('Hotel id is required');

    return this.httpClient.patch<Hotel>(`${ this.baseUrl }/hoteles/${hotel.id}`, hotel);
  }


  deleteHotelById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/hoteles/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),
      
    );
  }

}
