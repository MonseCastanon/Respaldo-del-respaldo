import { Injectable } from '@angular/core';
import IPData from 'ipdata';

@Injectable({
  providedIn: 'root'
})
export class IpdataService {

  constructor() {
    this.ipdataClient = new ipdata('TU_API_KEY');
  }

  getGeo(ip: string) {
    return this.ipdataClient.lookup(ip)
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      console.error('Error al obtener los datos de la Ip: ', error)
    })
  }
}
