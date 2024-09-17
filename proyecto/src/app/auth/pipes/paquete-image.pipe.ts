import { Pipe, PipeTransform } from '@angular/core';
import { Paquete } from '../interfaces/paquete.interface';

@Pipe({
  name: 'paqueteImage'
})
export class PaqueteImagePipe implements PipeTransform {

  transform( paquete: Paquete ): string {
    if( !paquete.id && !paquete.alt_img){
      return 'assets/no-image.png';
    }

    if ( paquete.alt_img ) return paquete.alt_img;

    return `assets/paquetes/${ paquete.id }.jpg`;

  }
}
