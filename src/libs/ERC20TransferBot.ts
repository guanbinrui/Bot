import BigNumber from 'bignumber.js';
import urlcat from 'urlcat';
import { BigNumber as BN, ethers, Event } from 'ethers';
import {
  COIN_GECKO_PLATFORM_ID,
  EXPLORER_URL,
  PROVIDER_NAME,
} from '../constants';
import { fetchJSON, formatBalance, scale10 } from '../helpers';
import { AlertLevel, AlertType, CurrencyType, ERC20Token } from '../types';
import { Bot } from './Bot';
import { parseUnits } from 'ethers/lib/utils';

const ERC20_ABIS = [
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

export class ERC20TrasnferBot extends Bot {
  constructor(
    url: string,
    protected token: ERC20Token,
    protected metrics: Record<AlertLevel, string>
  ) {
    super(url);
  }

  async fetchPriceInUSD() {
    try {
      const response = await fetchJSON<
        Record<string, Record<CurrencyType, number>>
      >(
        urlcat(
          'https://api.coingecko.com/api/v3/simple/token_price/:platform',
          {
            platform: COIN_GECKO_PLATFORM_ID[this.token.chainId],
            contract_addresses: [this.token.address],
            vs_currencies: CurrencyType.USD,
          }
        )
      );
      return response[this.token.address][CurrencyType.USD];
    } catch {
      return 0;
    }
  }

  start() {
    const contract = new ethers.Contract(
      this.token.address,
      ERC20_ABIS,
      this.provider
    );

    contract.on(
      'Transfer',
      async (from: string, to: string, amount: BN, event: Event) => {
        const priceInUSD = await this.fetchPriceInUSD();

        this.emitter.emit(
          'alert',
          AlertType.LARGE_AMOUNT_TRANSFER,
          amount.gt(
            parseUnits(this.metrics[AlertLevel.HIGH], this.token.decimals)
          )
            ? AlertLevel.HIGH
            : amount.gt(
                parseUnits(this.metrics[AlertLevel.MEDIUM], this.token.decimals)
              )
            ? AlertLevel.MEDIUM
            : AlertLevel.LOW,
          [
            `${formatBalance(amount.toString(), this.token.decimals, 2)} ${
              this.token.symbol
            }`,
            priceInUSD
              ? `(${formatBalance(
                  new BigNumber(priceInUSD).multipliedBy(amount.toString()),
                  this.token.decimals,
                  2
                )} USD)`
              : '',
            'transfer',
            `from ${from} to ${to}`,
            `on ${PROVIDER_NAME[this.token.chainId]}\n`,
            `> ${EXPLORER_URL[this.token.chainId]}/tx/${event.transactionHash}`,
          ]
            .filter(Boolean)
            .join(' ')
        );
      }
    );
  }
}
