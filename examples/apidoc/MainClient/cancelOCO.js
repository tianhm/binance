const { MainClient } = require('binance');

  // ENDPOINT: api/v3/orderList
  // METHOD: DELETE
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L767

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.cancelOCO(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
