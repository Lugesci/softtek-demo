import { OutputPersonDto } from "../dto/OutputPersonDto";
import { PersonRepository } from "../domain/person.repository";
import { DynamoDbRepository } from "../infrastructure/dynamoDb.repository";

export class GetAllPeopleService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new DynamoDbRepository();
  }

  async execute(): Promise<OutputPersonDto[]> {
    const result = await this.personRepository.findAll();

    return result.map((person) => new OutputPersonDto(person));
  }
}
