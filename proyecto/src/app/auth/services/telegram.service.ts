import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../enviroments/enviroments';

@Injectable({ providedIn: "root" })

export class TelegramService {

  private baseUrl:string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  // Método para enviar mensajes
  sendMessage(chatId: number, message: string): Observable<any> {
    const payload = { chatId, message };
    return this.http.post(`${this.baseUrl}/sendMessage`, payload);
  }
}
