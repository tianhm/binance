const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/dci/product/positions
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3097

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getDualInvestmentPositions(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
