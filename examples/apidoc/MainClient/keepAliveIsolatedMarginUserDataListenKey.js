const { MainClient } = require('binance');

  // ENDPOINT: sapi/v1/userDataStream/isolated?${serialiseParams(params)}
  // METHOD: PUT
  // PUBLIC: YES
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/main-client.ts#L3819

const client = new MainClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.keepAliveIsolatedMarginUserDataListenKey(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
