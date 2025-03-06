module.exports = {
  apps: [
    {
      name: 'AuthServer',
      script: './AuthServer.mjs', // Ensure the correct path
      watch: true,
      env: {
        NODE_ENV: "production", // Load .env or .env.production
      },
    },
    {
      name: 'Server',
      script: './server.mjs', // Ensure the correct path
      watch: true,
      env: {
        NODE_ENV: "production", // Load .env or .env.production
      },
    }
  ]
};