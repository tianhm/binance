const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/ping
  // METHOD: GET
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L130

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.testConnectivity(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
