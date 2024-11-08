// twitch.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwichService {
  private tokenKey = 'twitch_access_token';

  constructor(private http: HttpClient) {} // Asegúrate de incluir HttpClient aquí

  // Guardar el token en sessionStorage
  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Obtener el token de sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // Eliminar el token de sessionStorage (cerrar sesión)
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Obtener datos del usuario desde la API de Twitch
  getUserData(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Client-Id': 'kqia8canc4o9yaq94btw2s1vp2ig1m'
    });

    return this.http.get('https://api.twitch.tv/helix/users', { headers });
  }
}