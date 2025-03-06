import mysql from 'mysql2';

import pkg from 'aws-sdk';
const { SecretsManager } = pkg;
let SecretsManagerClient = new SecretsManager({
    region: 'us-east-1',
  });

  const SecretsManagerResult = await SecretsManagerClient
    .getSecretValue({
      SecretId: 'Labsecret',
    })
    .promise();

const SecretsManagerResponse = JSON.parse(SecretsManagerResult.SecretString);

// const connection = mysql.createConnection({
//   host: SecretsManagerResponse.host,   
//   user: SecretsManagerResponse.username,
//   password: SecretsManagerResponse.password,
//   database: 'SampleDB'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   
// });


export default SecretsManagerResponse; 