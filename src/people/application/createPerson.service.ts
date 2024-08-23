import { plainToInstance } from "class-transformer";

import { Person } from "../domain/person.entity";
import { OutputPersonDto } from "../dto/OutputPersonDto";
import { getNextId } from "../../shared/utils/getNextId";
import { PersonRepository } from "../domain/person.repository";
import { DynamoDbRepository } from "../infrastructure/dynamoDb.repository";

export class CreatePersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new DynamoDbRepository();
  }

  async execute(personData: Omit<Person, "id" | "created" | "edited">): Promise<OutputPersonDto> {
    const id = await getNextId("people_sequence");

    const timestamp = new Date();

    const person = new Person({
      id,
      created: timestamp,
      edited: timestamp,
      ...personData,
    });

    const result = await this.personRepository.save(person);

    return new OutputPersonDto(result);
  }
}
