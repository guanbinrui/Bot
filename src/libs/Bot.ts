import { Emitter } from '@servie/events';
import { ethers } from 'ethers';
import { BotEvent } from '../types';

export class Bot {
  constructor(protected url: string) {}

  public emitter = new Emitter<BotEvent>();
  protected provider = new ethers.providers.JsonRpcBatchProvider(this.url);

  start() {
    throw new Error('Method not implemented.');
  }
}
