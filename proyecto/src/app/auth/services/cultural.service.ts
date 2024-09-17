import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { Cultural } from "../interfaces/cultural.interface";
import { catchError, Observable, of } from "rxjs";


@Injectable({ providedIn: "root" })
export class CulturalesService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getCulturales(): Observable<Cultural[]> {
    return this.httpClient.get<Cultural[]>(`${this.baseUrl}/culturales`);
  }

  getCulturalById( id: string): Observable<Cultural|undefined>{
    return this.httpClient.get<Cultural>(`${ this.baseUrl}/culturales/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );
  }

}
