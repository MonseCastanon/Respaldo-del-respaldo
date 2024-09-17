import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../interfaces/restaurante.interface';

@Pipe({
  name: 'restauranteImage'
})
export class RestauranteImagePipe implements PipeTransform {

  transform( restaurante: Restaurante ): string {
    if( !restaurante.id && !restaurante.alt_img){
      return 'assets/no-image.png';
    }

    if ( restaurante.alt_img ) return restaurante.alt_img;

    return `assets/restaurantes/${ restaurante.id }.jpg`;

  }

}
