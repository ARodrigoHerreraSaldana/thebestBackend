module.exports = {
  apps: [
    {
      name: 'AuthServer',
      script: './AuthServer.mjs', // Ensure the correct path
      watch: true
    },
    {
      name: 'Server',
      script: './server.mjs', // Ensure the correct path
      watch: true
    }
  ]
};