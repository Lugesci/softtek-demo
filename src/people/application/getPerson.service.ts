import axios from "axios";

import { Person } from "../domain/person.entity";
import { OutputPersonDto } from "../dto/OutputPersonDto";
import { getNextId } from "../../shared/utils/getNextId";
import { PersonRepository } from "../domain/person.repository";
import { DynamoDbRepository } from "../infrastructure/dynamoDb.repository";

export class GetPersonService {
  private personRepository: PersonRepository;

  constructor() {
    this.personRepository = new DynamoDbRepository();
  }

  async execute(id: number): Promise<OutputPersonDto | null> {
    const result = await this.personRepository.findById(id);

    if (result) {
      return new OutputPersonDto(result);
    }

    const swapiData = await this.fetchFromSwapi(id);

    if (swapiData) {
      const id = await getNextId("people_sequence");

      const timestamp = new Date();

      const person = new Person({
        ...swapiData,
        id,
        created: timestamp,
        edited: timestamp,
      });

      const resultCreated = await this.personRepository.save(person);

      return new OutputPersonDto(resultCreated);
    }

    return null;
  }

  private async fetchFromSwapi(id: number): Promise<Person | null> {
    try {
      const response = await axios.get<Person | null>(`https://swapi.dev/api/people/${id}/`);
      return response.data;
    } catch (err) {
      console.error("Error al obtener el recurso desde SWAPI:", err);
      return null;
    }
  }

  /*private async saveItemToDynamoDB(id: number, data: any): Promise<Person> {
    const params = {
      TableName: this.tableName,
      Item: {
        id,
        ...data,
      },
    };
    
    const result = (await dynamoDb.send(new PutCommand(params))) as IPutCommandOutput<Person>;
    
    return result.Attributes;
  }*/
}
