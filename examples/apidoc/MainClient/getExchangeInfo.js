const { MainClient } = require('binance');

  // ENDPOINT: api/v3/exchangeInfo
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L575

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getExchangeInfo(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
