CREATE TABLE trades (
  time TIMESTAMP NOT NULL,
  symbol TEXT NOT NULL,
  trade_id BIGINT NOT NULL,
  price NUMERIC NOT NULL,
  quantity NUMERIC NOT NULL
);

SELECT create_hypertable('trades', 'time');

CREATE MATERIALIZED VIEW trades_ohlcv_m1
WITH (timescaledb.continuous)
AS
SELECT
  time_bucket('1 min', time) AS bucket,
  symbol,
  FIRST(price, time) AS open,
  MAX(price) AS high,
  MIN(price) AS low,
  LAST(price, time) AS close,
  SUM(quantity) AS volume
FROM
  trades
GROUP BY bucket, symbol;

CREATE MATERIALIZED VIEW trades_ohlcv_m5
WITH (timescaledb.continuous)
AS
SELECT
  time_bucket('5 min', time) AS bucket,
  symbol,
  FIRST(price, time) AS open,
  MAX(price) AS high,
  MIN(price) AS low,
  LAST(price, time) AS close,
  SUM(quantity) AS volume
FROM
  trades
GROUP BY bucket, symbol;
