import {
    ExchangeInfo,
    MainClient,
    numberInString,
    roundToStepSize,
    roundToTickSize,
} from '../../src'; // from 'binance';

// or
// import { MainClient } from 'binance';

const client = new MainClient({
  // Optional (default: false) - when true, response strings are parsed to floats (only for known keys).
  // beautifyResponses: true,
});

interface SymbolInfo {
  tickSize: numberInString;
  qtyStepSize: numberInString;
  minOrderQty: numberInString;
  maxOrderQty: numberInString;
  maxMarketQty: numberInString;
  maxNumOfOrders: number;
  minNotional: numberInString;
  maxNotional: numberInString;
  maxBasePrecisionDecimals: number;
  maxQuotePrecisionDecimals: number;
}

// Get full exchange info so we can cache it and use it for other functions without making request every time
async function fetchExchangeInfo() {
  try {
    const exchangeInfo = await client.getExchangeInfo();
    return exchangeInfo;
  } catch (error) {
    throw new Error(`Failed to get exchange info: ${error.message}`);
  }
}

const symbol = 'SOLUSDT';

async function getSymbolInfo(
  exchangeInfo: ExchangeInfo,
  symbol: string,
): Promise<SymbolInfo> {
  try {
    // Find the symbol information once
    const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
    // console.log(symbolInfo);

    if (!symbolInfo) {
      throw new Error(`Symbol ${symbol} not found in exchange info`);
    }

    // Extract filters from the symbol info
    const priceFilter = symbolInfo.filters.find(
      (f) => f.filterType === 'PRICE_FILTER',
    );
    const lotSizeFilter = symbolInfo.filters.find(
      (f) => f.filterType === 'LOT_SIZE',
    );
    const marketLotSizeFilter = symbolInfo.filters.find(
      (f) => f.filterType === 'MARKET_LOT_SIZE',
    );
    const maxNumOrdersFilter = symbolInfo.filters.find(
      (f) => f.filterType === 'MAX_NUM_ORDERS',
    );
    const notionalFilter = symbolInfo.filters.find(
      (f) => f.filterType === 'NOTIONAL',
    );

    const symbolFilters = {
      tickSize: priceFilter?.tickSize,
      qtyStepSize: lotSizeFilter?.stepSize,
      minOrderQty: lotSizeFilter?.minQty,
      maxOrderQty: lotSizeFilter?.maxQty,
      maxMarketQty: marketLotSizeFilter?.maxQty,
      maxNumOfOrders: maxNumOrdersFilter?.maxNumOrders,
      minNotional: notionalFilter?.minNotional,
      maxNotional: notionalFilter?.maxNotional,
      maxBasePrecisionDecimals: symbolInfo.baseAssetPrecision,
      maxQuotePrecisionDecimals: symbolInfo.quoteAssetPrecision,
    };
    console.log(symbolFilters);

    return symbolFilters;
  } catch (error) {
    throw new Error(`Failed to get symbol info: ${error.message}`);
  }
}

/**
 * Validates and formats an order based on symbol constraints
 */
function formatOrderParams(
  symbol: string,
  price: number,
  quantity: number,
  symbolInfo: any,
): { symbol: string; price: number; quantity: number } {
  try {
    // Check if price is within allowed range
    const minPrice = parseFloat(symbolInfo.tickSize || '0');
    if (price < minPrice) {
      throw new Error(`Price ${price} is below minimum ${minPrice}`);
    }

    // Check if quantity is within allowed range
    const minQty = parseFloat(symbolInfo.minOrderQty || '0');
    const maxQty = parseFloat(symbolInfo.maxOrderQty || Infinity);

    if (quantity < minQty) {
      throw new Error(`Quantity ${quantity} is below minimum ${minQty}`);
    }

    if (quantity > maxQty) {
      throw new Error(`Quantity ${quantity} exceeds maximum ${maxQty}`);
    }

    // Check notional value (price * quantity)
    const notional = price * quantity;
    const minNotional = parseFloat(symbolInfo.minNotional || '0');

    if (notional < minNotional) {
      throw new Error(
        `Order value ${notional} is below minimum ${minNotional}`,
      );
    }

    // Format price and quantity according to exchange requirements
    const formattedPrice = roundToTickSize(price, symbolInfo.tickSize);
    const formattedQty = roundToStepSize(quantity, symbolInfo.qtyStepSize);

    return {
      symbol,
      price: formattedPrice,
      quantity: formattedQty,
    };
  } catch (error) {
    throw new Error(`Failed to format order: ${error.message}`);
  }
}

// Example usage
async function testSymbolUtils() {
  const exchangeInfo = await fetchExchangeInfo();
  if (!exchangeInfo) return;

  const symbolFilters = await getSymbolInfo(exchangeInfo, symbol);
  if (!symbolFilters) return;

  // Test price formatting
  const testPrice = 23.45678;
  console.log(
    `Original price: ${testPrice}`,
    `Formatted price: ${roundToTickSize(testPrice, symbolFilters.tickSize.toString())}`,
  );

  // Test quantity formatting
  const testQty = 1.23456;
  console.log(
    `Original quantity: ${testQty}`,
    `Formatted quantity: ${roundToStepSize(
      testQty,
      symbolFilters.qtyStepSize.toString(),
    )}`,
  );

  // Test full order formatting
  const orderParams = formatOrderParams(
    symbol,
    testPrice,
    testQty,
    symbolFilters,
  );
  console.log('Formatted order parameters:', orderParams);

  // example how to use the order params
  const order = await client.submitNewOrder({
    symbol: orderParams.symbol,
    side: 'BUY',
    type: 'LIMIT',
    quantity: Number(orderParams.quantity),
    price: Number(orderParams.price),
    timeInForce: 'GTC',
  });

  console.log(order);
}

testSymbolUtils();
