import { SecretsManager } from 'aws-sdk';
let SecretsManagerClient = new SecretsManager({
    region: 'us-east-1',
  });

  const SecretsManagerResult = await SecretsManagerClient
    .getSecretValue({
      SecretId: 'fortheBackend',
    })
    .promise();

    const SecretsManagerResponse = JSON.parse(SecretsManagerResult.SecretString);
    console.log(SecretsManagerResponse)