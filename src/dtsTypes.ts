// {
//   response: {
//     stream: 'achbusd@aggTrade',
//     data:             {
//      "e": "aggTrade",		# event type
//      "E": 1499405254326,	# event time
//      "s": "ETHBTC",			# symbol
//      "a": 70232,			  	# aggregated tradeid
//      "p": "0.10281118",	# price
//      "q": "8.15632997",	# quantity
//      "f": 77489,				  # first breakdown trade id
//      "l": 77489,				  # last breakdown trade id
//      "T": 1499405254324,	# trade time
//      "m": false,				  # whether buyer is a maker
//      "M": true				    # can be ignored
//   }
// }

export type Trade = {
  time: number;
  symbol: string;
  trade_id: number;
  price: string;
  quantity: string;
};
