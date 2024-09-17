import { Pipe, PipeTransform } from '@angular/core';
import { Atractivo } from '../interfaces/atractivo.interface';

@Pipe({
  name: 'atractivoImage'
})
export class AtractivoImagePipe implements PipeTransform {

  transform( atractivo: Atractivo ): string {
    if( !atractivo.id && !atractivo.alt_img){
      return 'assets/no-image.png';
    }

    if ( atractivo.alt_img ) return atractivo.alt_img;

    return `assets/atractivos/${ atractivo.id }.jpg`;

  }

}
