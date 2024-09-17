import { Pipe, PipeTransform } from '@angular/core';
import { Experiencia } from '../interfaces/experiencia.interface';

@Pipe({
  name: 'expImage'
})
export class ExpImagePipe implements PipeTransform {

  transform( experiencia: Experiencia ): string {
    if( !experiencia.id && !experiencia.alt_img){
      return 'assets/no-image.png';
    }

    if ( experiencia.alt_img ) return experiencia.alt_img;

    return `assets/experiencias/${ experiencia.id }.jpg`;

  }
}
