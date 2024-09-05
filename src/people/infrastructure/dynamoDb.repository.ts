import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { Person } from "../domain/person.entity";
import { PersonRepository } from "../domain/person.repository";
import {
  IGetCommandOutput,
  IPutCommandOutput,
  IScanCommandOutput,
  IDeleteCommandOutput,
} from "../../types/dynamoDb.types";

const client = new DynamoDBClient({
  region: process.env.CURRENT_REGION,
});
const dynamoDb = DynamoDBDocumentClient.from(client);

export class DynamoDbRepository implements PersonRepository {
  private readonly tableName = process.env.DYNAMODB_TABLE!;

  async save(person: Person): Promise<Person> {
    const result = (await dynamoDb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          ...person,
          created: person.created.getTime(), // Guardar como timestamp numérico
          edited: person.edited.getTime(), // Guardar como timestamp numérico
        },
      })
    )) as IPutCommandOutput<Person>;

    return result.Attributes;
  }

  async delete(id: number): Promise<void> {
    const result = (await dynamoDb.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id },
      })
    )) as IDeleteCommandOutput<Person>;

    console.log(result.Attributes);
  }

  async findById(id: number): Promise<Person | null> {
    const result = (await dynamoDb.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id },
      })
    )) as IGetCommandOutput<Person>;

    if (!result.Item) {
      return null;
    }

    return {
      ...result.Item,
      created: new Date(result.Item.created),
      edited: new Date(result.Item.edited),
    };
  }

  async findAll(): Promise<Person[]> {
    const result = (await dynamoDb.send(
      new ScanCommand({
        TableName: this.tableName,
      })
    )) as IScanCommandOutput<Person[]>;

    return result.Items || [];
  }

  async update(person: Person): Promise<Person> {
    const existingItem = await this.findById(person.id);

    if (!existingItem) {
      throw new Error("El recurso no existe.");
    }

    const result = (await dynamoDb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          ...person,
          created: person.created.getTime(), // Asegurarse de que el timestamp original se mantenga
          edited: person.edited.getTime(), // Actualizar con la nueva fecha de edición
        },
      })
    )) as IPutCommandOutput<Person>;

    return result.Attributes;
  }
}
