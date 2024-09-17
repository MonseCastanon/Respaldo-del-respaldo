export interface Agencia {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  direccion: string;
  contactos: string;
  red_social: string;
  correo: string;
  alt_img?: string;
  selected?: boolean; // Propiedad opcional para manejar la selección
}
