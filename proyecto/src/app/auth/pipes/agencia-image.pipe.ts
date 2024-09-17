import { Pipe, PipeTransform } from '@angular/core';
import { Agencia } from '../interfaces/agencia.interface';


@Pipe({
  name: 'agenciaImage'
})
export class AgenciaImagePipe implements PipeTransform {

  transform( agencia: Agencia ): string {
    if( !agencia.id && !agencia.alt_img){
      return 'assets/no-image.png';
    }

    if ( agencia.alt_img ) return agencia.alt_img;

    return `assets/agencias/${ agencia.id }.jpg`;

  }
}
