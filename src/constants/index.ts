import { AlertLevel, ChainId, CurrencyType, ERC20Token } from '../types';

export const COIN_GECKO_PLATFORM_ID: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'ethereum',
  [ChainId.BNB]: 'binance-smart-chain',
  [ChainId.Polygon]: 'polygon-pos',
};

export const CURRENCY_NAME: Record<CurrencyType, string> = {
  [CurrencyType.USD]: 'USD',
};

export const PROVIDER_NAME: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'Ethereum Mainnet',
  [ChainId.BNB]: 'Binance',
  [ChainId.Polygon]: 'Polygon',
};

export const EXPLORER_URL: Record<string, string> = {
  [ChainId.Mainnet]: 'https://etherscan.io',
  [ChainId.BNB]: 'https://bscscan.com',
  [ChainId.Polygon]: 'https://polygonscan.com',
};

export const RPC_PROVIDERS: Record<ChainId, string[]> = {
  [ChainId.Mainnet]: [
    'https://mainnet.infura.io/v3/659123dd11294baf8a294d7a11cec92c',
  ],
  [ChainId.BNB]: ['https://bsc-dataseed.binance.org/'],
  [ChainId.Polygon]: [
    'https://polygon-mainnet.infura.io/v3/659123dd11294baf8a294d7a11cec92c',
  ],
};

export const MASK_TOKEN_ADDRESSES: Record<ChainId, string> = {
  [ChainId.Mainnet]: '0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074',
  [ChainId.BNB]: '0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3',
  [ChainId.Polygon]: '0x2B9E7ccDF0F4e5B24757c1E1a80e311E34Cb10c7',
};

export const ALERT_LEVEL_ICON: Record<AlertLevel, string> = {
  [AlertLevel.LOW]: '3️⃣',
  [AlertLevel.MEDIUM]: '2️⃣',
  [AlertLevel.HIGH]: '1️⃣',
};
