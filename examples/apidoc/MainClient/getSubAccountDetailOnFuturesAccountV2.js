const { MainClient } = require('binance');

  // ENDPOINT: sapi/v2/sub-account/futures/account
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1669

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getSubAccountDetailOnFuturesAccountV2(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
