const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

// Configurar AWS SDK para apuntar a la región correcta
const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamoDb = DynamoDBDocumentClient.from(client);

const initializeSequenceTable = async () => {
  const params = {
    TableName: process.env.SEQUENCE_TABLE || 'sequence',
    Item: {
      sequence_name: 'people_sequence',
      current_value: 0,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Secuencia iniciada correctamente');
  } catch (err) {
    console.error('Error inicializando secuencia:', err);
  }
};

initializeSequenceTable();
