export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  accountServiceUrl: 'http://localhost:3001',
  authServiceUrl: 'http://localhost:3003',
  transactionServiceUrl: 'http://localhost:3002',
  keycloak: {
    url: 'http://keycloak.bankapp.local',
    realm: 'bankapp-dev',
    clientId: 'bankapp-web-dev'
  }
};
