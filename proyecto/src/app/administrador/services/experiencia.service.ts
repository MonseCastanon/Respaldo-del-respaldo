import { Injectable } from "@angular/core";
import { enviroments } from "../../../enviroments/enviroments";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Experiencia } from "../interfaces/experiencia.interface";

@Injectable({ providedIn: "root" })
export class ExperienciasService {    /*Recuerden que lleva 2 "S" */

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
  getSuggestions( query: string ):Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(`${this.baseUrl}/experiencias?q=${ query }&_limit=6`);
  }

  addExperiencia( experiencia:Experiencia):Observable<Experiencia> {
    return this.httpClient.post<Experiencia>(`${this.baseUrl}/experiencias`, experiencia);
  }

  updateExperiencia( experiencia:Experiencia):Observable<Experiencia> {
    if (!experiencia.id) throw Error('Experiencia id is required');

    return this.httpClient.patch<Experiencia>(`${ this.baseUrl }/experiencias/${experiencia.id}`, experiencia);
  }


  deleteExperienciaById( id: string ):Observable<boolean> {

    return this.httpClient.delete(`${this.baseUrl }/experiencias/${ id }`)
    .pipe(
      map( resp => true),
      catchError( err=> of(false)),

    );
  }

}
