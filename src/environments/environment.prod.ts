export const environment = {
  production: true,
  apiUrl: 'http://api-gateway-prd:3000',
  accountServiceUrl: 'http://account-service-prd:3001',
  authServiceUrl: 'http://auth-service-prd:3003',
  transactionServiceUrl: 'http://transaction-service-prd:3002',
  keycloak: {
    url: 'http://keycloak.bankapp.local',
    realm: 'bankapp-prd',
    clientId: 'bankapp-web-prd'
  }
};
