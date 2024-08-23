import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";

import { CreatePersonDto } from "../dto/CreatePersonDto";
import { validateInput } from "../../shared/utils/validateInput";
import { CreatePersonService } from "../application/createPerson.service";

const createPersonService = new CreatePersonService();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const body = event.body || {};

  const personData = await validateInput(CreatePersonDto, body);
  if (!personData) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error al crear el recurso" }),
    };
  }

  const result = await createPersonService.execute(personData);
  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
};
