const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/convert/acceptQuote
  // METHOD: POST
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L620

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.acceptConvertQuote(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
