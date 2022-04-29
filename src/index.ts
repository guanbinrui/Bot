import { ERC20TrasnferBot } from './libs/ERC20TransferBot';
import {
  ALERT_LEVEL_ICON,
  MASK_TOKEN_ADDRESSES,
  RPC_PROVIDERS,
} from './constants';
import { getEnumAsArray } from './helpers';
import { AlertLevel, ChainId } from './types';
import BigNumber from 'bignumber.js';

const WATCHED_TRANSFER_TOKENS = [
  ...getEnumAsArray(ChainId).map(({ value: chainId }) => ({
    chainId,
    address: MASK_TOKEN_ADDRESSES[chainId],
    name: 'Mask Network',
    symbol: 'MASK',
    decimals: 18,
  })),
];

async function main() {
  WATCHED_TRANSFER_TOKENS.forEach((token) => {
    const bot = new ERC20TrasnferBot(RPC_PROVIDERS[token.chainId][0], token, {
      [AlertLevel.LOW]: '0',
      [AlertLevel.MEDIUM]: '10000',
      [AlertLevel.HIGH]: '50000',
    });

    bot.emitter.on('alert', (type, level, message) => {
      console.log(`${ALERT_LEVEL_ICON[level]}  ${message}`);
    });

    bot.start();
  });

  console.log('Bot is running...');
}

main();
