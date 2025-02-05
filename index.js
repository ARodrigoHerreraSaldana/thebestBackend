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
    const{ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = SecretsManagerResponse
export {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET}