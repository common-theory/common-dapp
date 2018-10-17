import Web3 from 'web3';
import { observable, action } from 'mobx';

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.200:8545"));
}

interface BlockHeader {
  number?: number,
  hash?: string,
  parentHash: string,
  nonce?: string,
  sha3Uncles: string,
  logsBloom?: string,
  transactionsRoot: string,
  stateRoot: string,
  receiptsRoot: string,
  miner: string,
  extraData: string,
  gasLimit: number,
  gasUsed: number,
  timestamp: number
}

export default class EthStore {

  @observable networkId: number = -1;

  private blockHeaderSubscription: any;
  @observable currentBlockHeader?: BlockHeader;
  @observable receivedBlockHeaders: BlockHeader[] = [];

  @observable currentBlockNumber: number = 0;

  constructor() {
    this.blockHeaderSubscription = web3.eth.subscribe('newBlockHeaders');
    this.blockHeaderSubscription.on('data', (blockHeader: BlockHeader) => {
      this.currentBlockHeader = blockHeader;
      this.receivedBlockHeaders.push(blockHeader);
      this.currentBlockNumber = blockHeader.number;
    });
    this.blockHeaderSubscription.on('error', console.error);
    this.loadNetworkId();
    this.loadBlock();
  }

  @action
  async loadNetworkId() {
    this.networkId = await web3.eth.net.getId();
  }

  @action
  async loadBlock() {
    await this.loadBlockNumber();
    this.currentBlockHeader = await web3.eth.getBlock(this.currentBlockNumber);
  }

  @action
  async loadBlockNumber() {
    this.currentBlockNumber = await web3.eth.getBlockNumber();
  }
}