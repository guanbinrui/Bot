export enum ChainId {
  Mainnet = 1,
  BNB = 56,
  Polygon = 137,
}

export enum CurrencyType {
  USD = 'usd',
}

export enum AlertType {
  LARGE_AMOUNT_TRANSFER = 1,
}

export enum AlertLevel {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export interface BotEvent {
  alert: [AlertType, AlertLevel, string];
}

export interface ERC20Token {
  chainId: ChainId;
  address: string;
  name: string;
  symbol?: string;
  decimals: number;
}
