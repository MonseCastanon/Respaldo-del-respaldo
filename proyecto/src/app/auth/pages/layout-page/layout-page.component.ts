import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class LayoutPageComponent implements OnInit {
  public sidebarItem=[
    {label:'Inicio', icon:'home', url:'./inicio'},
    {label:'Lugares', icon:'map', url:'./listalugar'},
    {label:'Experiencias', icon:'whatshot', url:'./experiencias'},
    {label:'Paquetes', icon:'apps', url:'./paquetes'},
    {label:'Paquete personalizado', icon:'send', url:'./formulario'},
    {label:'Contacto Agencias', icon:'mail_outline', url:'./agencias'},
    {label:'Administrador', icon:'account_circle', url:'./login'},
  ]
  
  constructor(private authService: SocialAuthService) { }

  user: any;
  loggedIn: any;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}