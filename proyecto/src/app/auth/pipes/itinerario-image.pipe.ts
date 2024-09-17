// import { Pipe, PipeTransform } from '@angular/core';
// import { Itinerario } from '../interfaces/itinerario.interface';

// @Pipe({
//   name: 'itinerarioImage'
// })
// export class ItinerarioImagePipe implements PipeTransform {

//   transform( itinerario: Itinerario ): string {
//     if( !itinerario.id && !itinerario.alt_img){
//       return 'assets/no-image.png';
//     }

//     if ( itinerario.alt_img ) return itinerario.alt_img;

//     return `assets/itinerarios/${ itinerario.id }.jpg`;

//   }
// }
