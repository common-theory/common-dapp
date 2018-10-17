import { observable, action } from 'mobx';

interface Member {
  ownership: number,
  name: string,
  github: string,
  website: string
}

export default class DACStore {

  private contract: any;
  @observable totalVotingMembers: number = 0;
  @observable totalOwnership: number = 0;

  @observable currentVoteCycle: number = 0;
  @observable contractUpdated: boolean = false;

  constructor() {
    let ABI;
    try {
      ABI = require('../../CommonDAC.abi.json');
    } catch (err) {
      console.log('Error loading contract ABI, ensure that it\'s present');
      throw err;
    }
    this.contract = new web3.eth.Contract(ABI, '0x265369a96693b47b28645ec2cb34c15d52b1d190');
    this.loadVotingMembers();
    this.loadTotalOwnership();
    this.loadCurrentVoteCycle();
  }

  async loadVotingMembers() {
    this.totalVotingMembers = await this.contract.methods.totalVotingMembers().call();
  }

  async loadTotalOwnership() {
    this.totalOwnership = await this.contract.methods.totalOwnership().call();
  }

  async loadCurrentVoteCycle() {
    this.currentVoteCycle = await this.contract.methods.currentVoteCycle().call();
  }

}
