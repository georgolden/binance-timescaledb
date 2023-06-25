import { WebSocket } from 'ws';
import { db } from './db';

const transform = {
  aggTrade: (aggTrade) => {
    const { a: trade_id, T: time, s: symbol, p: price, q: quantity } = aggTrade;
    return {
      time: new Date(time), symbol, trade_id: Number(trade_id), price, quantity,
    };
  },
};

const createQuery = {
  aggTrade: (trade) => [
    `
    INSERT INTO trades (
      ${Object.keys(trade).join()}
    )
    VALUES (
      $1, $2, $3, $4, $5
    )
  `,
    Object.values(trade),
  ],
};

const getEventType = (eventData) => eventData?.e;

const binanceWsMessageHandler = async ({ data }) => {
  const msg = JSON.parse(data);
  const eventType = getEventType(msg);
  if (eventType in transform) {
    const prepared = transform[eventType](msg);
    const [sql, params] = createQuery[eventType](prepared);
    await db.query(sql, params);
  }
};

let callId = 0;

const subscribe = {
  aggTrade: (symbols) => {
    const params = symbols.map((s) => `${s.toLowerCase()}@aggTrade`);
    return {
      method: 'SUBSCRIBE',
      params,
      id: ++callId,
    };
  },
};

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

const createWs = (url) => new WebSocket(url, { perMessageDeflate: false });

const ws = createWs(BINANCE_WS_URL);

ws.onmessage = binanceWsMessageHandler;

ws.onerror = (err) => {
  console.error(err);
};

ws.onopen = () => {
  ws.send(JSON.stringify(subscribe.aggTrade(['BTCUSDT', 'ETHUSDT'])));
};
