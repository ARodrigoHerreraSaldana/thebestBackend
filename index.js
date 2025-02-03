import pkg from 'aws-sdk';
const { SecretsManager } = pkg;
let SecretsManagerClient = new SecretsManager({
    region: 'us-east-1',
  });

  const SecretsManagerResult = await SecretsManagerClient
    .getSecretValue({
      SecretId: 'fortheBackend',
    })
    .promise();

    const SecretsManagerResponse = JSON.parse(SecretsManagerResult.SecretString);
    console.log('x', SecretsManagerResponse)