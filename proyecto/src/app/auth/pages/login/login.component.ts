import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  usuario: string = '';
  pass: string = '';

  constructor(private authServices: AuthServices, private router: Router) {}

  onLogin() {
    this.authServices.login(this.usuario, this.pass).subscribe(response => {
      if (response && response.autenticado) {
        // ? Redirigir al usuario a la página principal o a la ruta que corresponda
        this.router.navigate(['/administrador/listado']);
        console.log('Boton y envio logueo')
      } else {
        // ! Mostrar un mensaje de error si la autenticación falla
        alert('Usuario o contraseña incorrectos');
        console.log('Error de logueo')
      }
    });
  }
}
