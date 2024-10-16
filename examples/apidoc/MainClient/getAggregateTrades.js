const { MainClient } = require('binance');

  // ENDPOINT: api/v3/aggTrades
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L607

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getAggregateTrades(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
