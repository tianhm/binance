const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/apiTradingStatus
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L539

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getApiQuantitativeRulesIndicators(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
