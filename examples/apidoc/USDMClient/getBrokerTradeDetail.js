const { USDMClient } = require('binance');

  // ENDPOINT: fapi/v1/apiReferral/traderSummary
  // METHOD: GET
  // PUBLIC: NO
  // Link to function: https://github.com/tiagosiebler/binance/blob/master/src/usdm-client.ts#L746

const client = new USDMClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getBrokerTradeDetail(params)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
