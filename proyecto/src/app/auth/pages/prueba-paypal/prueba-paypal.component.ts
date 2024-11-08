import { Component, OnInit } from '@angular/core';
import { TelegramService } from '../../services/telegram.service'; 
@Component({
    selector: 'app-prueba-paypal',
    templateUrl: './prueba-paypal.component.html',
    styleUrls: ['./prueba-paypal.component.css']
})
export class PruebaPaypalComponent {
    mensaje: string = 'Hola';
    chatId: number = 1; // Reemplaza con el chatId correspondiente

    constructor(private telegramService: TelegramService) { }

    enviarMensaje() {
        this.telegramService.sendMessage(this.chatId, this.mensaje).subscribe(
            response => {
                console.log('Mensaje enviado:', response);
                alert('Mensaje enviado correctamente!');
            },
            error => {
                console.error('Error al enviar mensaje:', error);
                alert('Hubo un error al enviar el mensaje.');
            }
        );
    }
}
