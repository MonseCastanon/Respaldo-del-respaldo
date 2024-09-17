import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from '../interfaces/hotel.interface';
@Pipe({
  name: 'hotelImage'
})
export class HotelImagePipe implements PipeTransform {

  transform( hotel: Hotel ): string {
    if( !hotel.id && !hotel.alt_img){
      return 'assets/no-image.png';
    }

    if ( hotel.alt_img ) return hotel.alt_img;

    return `assets/hoteles/${ hotel.id }.jpg`;

  }
}
