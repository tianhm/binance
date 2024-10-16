const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/sub-account/margin/enable
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L1547

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.subAccountEnableMargin(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
