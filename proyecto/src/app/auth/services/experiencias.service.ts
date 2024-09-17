import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { enviroments } from '../../../enviroments/enviroments';
import { Experiencia } from "../interfaces/experiencia.interface";


@Injectable({ providedIn: "root" })
export class ExperienciasService {

  private baseUrl:string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getExperiencias(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(`${this.baseUrl}/experiencias`);
  }
  getExperienciaById( id: string): Observable<Experiencia|undefined>{
    return this.httpClient.get<Experiencia>(`${ this.baseUrl}/experiencias/${ id }`)
    .pipe(
      catchError( error=> of(undefined))
    );
  }
}
