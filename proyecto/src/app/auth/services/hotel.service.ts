import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { enviroments } from '../../../enviroments/enviroments';
import { Hotel } from "../interfaces/hotel.interface";

@Injectable({ providedIn: "root" })
export class HotelesService {

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

}
