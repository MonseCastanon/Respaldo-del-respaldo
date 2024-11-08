// import { Component, OnInit } from '@angular/core';
// import { TwichService } from '../../services/twich.service';

// @Component({
//   selector: 'app-prueba-twitch',
//   templateUrl: './prueba-twich.component.html',
//   styleUrls: ['./prueba-twich.component.css']
// })
// export class PruebaTwichComponent implements OnInit {
//   isAuthenticated = false;
//   userData: any;

//   constructor(private twichService: TwichService) {}

//   ngOnInit(): void {
//     // Verificar si el usuario ya está autenticado
//     this.isAuthenticated = this.twichService.isAuthenticated();

//     // Si el usuario es redirigido con un token de acceso, lo capturamos
//     const fragment = window.location.hash.substring(1);
//     const params = new URLSearchParams(fragment);
//     const accessToken = params.get('access_token');

//     if (accessToken) {
//       this.twichService.saveToken(accessToken);
//       this.isAuthenticated = true;

//       // Quitar el token de la URL por razones de seguridad
//       window.history.replaceState({}, document.title, "/");
//     }
//     if (this.isAuthenticated) {
//       this.twichService.getUserData().subscribe(data => {
//         this.userData = data.data[0]; 
//       });
//     }
//   }

//   login(): void {
//     const clientId = 'kqia8canc4o9yaq94btw2s1vp2ig1m';
//     const redirectUri = 'http://localhost:4200';
//     const scope = 'user:read:email channel:manage:broadcast';
//     const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
//     window.location.href = authUrl;
//   }

//   logout(): void {
//     this.twichService.clearToken();
//     this.isAuthenticated = false;
//   }
// }
