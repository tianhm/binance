const { MainClient } = require('binance');

  // ENDPOINT: api/v3/uiKlines
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L617

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getUIKlines(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
