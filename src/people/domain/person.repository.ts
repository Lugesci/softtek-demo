import { Person } from "./person.entity";

export interface PersonRepository {
  save(person: Person): Promise<Person>;

  findById(id: number): Promise<Person | null>;

  findAll(): Promise<Person[]>;

  update(person: Person): Promise<Person>;

  delete(id: number): Promise<void>;
}
