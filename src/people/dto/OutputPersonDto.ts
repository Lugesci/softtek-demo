import { Person } from "../domain/person.entity";

export class OutputPersonDto {
  constructor(person: Person) {
    this.id = person.id;

    this.nombre = person.name;

    this.altura = person.height;

    this.peso = person.mass;

    this.color_pelo = person.hair_color;

    this.color_piel = person.skin_color;

    this.color_ojos = person.eye_color;

    this.anio_nacimiento = person.birth_year;

    this.genero = person.gender;

    this.mundo_natal = person.homeworld;

    this.peliculas = person.films;

    this.especies = person.species;

    this.vehiculos = person.vehicles;

    this.naves_estelares = person.starships;

    this.creado = person.created;

    this.editado = person.edited;

    this.enlace = person.url;
  }

  id: number;

  nombre: string;

  altura: string;

  peso: string;

  color_pelo: string;

  color_piel: string;

  color_ojos: string;

  anio_nacimiento: string;

  genero: string;

  mundo_natal: string;

  peliculas: string[];

  especies: string[];

  vehiculos: string[];

  naves_estelares: string[];

  creado: Date;

  editado: Date;

  enlace: string;
}
