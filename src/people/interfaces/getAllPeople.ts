import { APIGatewayProxyHandler } from "aws-lambda";

import { GetAllPeopleService } from "../application/getAllPeople.service";

const getAllPeopleService = new GetAllPeopleService();

export const handler: APIGatewayProxyHandler = async () => {
  const person = await getAllPeopleService.execute();

  if (!person) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Recurso no encontrado" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(person),
  };
};
