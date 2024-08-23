import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";

import { GetPersonService } from "../application/getPerson.service";

const getPersonService = new GetPersonService();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const id = parseInt(event.pathParameters?.id || "0", 10);

  if (isNaN(id) || id <= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "ID inválido" }),
    };
  }

  // Obtener la persona utilizando el servicio de aplicación
  const person = await getPersonService.execute(id);

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
