export const environment = {
  production: false,
  apiUrl: 'http://api-gateway-qa:3000',
  accountServiceUrl: 'http://account-service-qa:3001',
  authServiceUrl: 'http://auth-service-qa:3003',
  transactionServiceUrl: 'http://transaction-service-qa:3002',
  keycloak: {
    url: 'http://keycloak.bankapp.local',
    realm: 'bankapp-qa',
    clientId: 'bankapp-web-qa'
  }
};
