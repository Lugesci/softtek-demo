import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.CURRENT_REGION });
const dynamoDb = DynamoDBDocumentClient.from(client);

export const getNextId = async (sequenceName: string): Promise<number> => {
  const result = await dynamoDb.send(
    new UpdateCommand({
      TableName: process.env.SEQUENCE_TABLE!,
      Key: { sequence_name: sequenceName },
      UpdateExpression: 'SET current_value = current_value + :incr',
      ExpressionAttributeValues: {
        ':incr': 1,
      },
      ReturnValues: 'UPDATED_NEW',
    })
  );

  return result.Attributes?.current_value;
};
