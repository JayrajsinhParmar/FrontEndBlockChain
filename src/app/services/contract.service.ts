import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';
import { todoListAbi } from '../Constant/todoListAbi';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal;
  contract: any;
  networkId: any;

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID', // required
        },
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'local', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();

    // this.provider = await this.web3Modal.connect(); // set provider
    // this.web3js = new Web3(this.provider); // create web3 instance
    // this.accounts = await this.web3js.eth.getAccounts();
    // this.accountStatusSource.next(this.accounts)
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
      provider
        .request({ method: 'eth_requestAccounts' })
        .then((acc: any) => {
          this.accounts = acc[0];
          console.log('account', this.accounts);
        })
        .catch((err: any) => {
          console.error(err);
        });
      const web3 = new Web3(window.ethereum);
      this.networkId = await web3.eth.net.getId();
      this.contract = new web3.eth.Contract(
        todoListAbi.abi,
        '0xd9145CCE52D386f254917e481eB44e9943F39138'
      );
    }
    debugger;
  }
  async getTaskCount() {
    const count = await this.contract.methods
      .todoCount()
      .call()
      .then((res: any) => {
        return res;
      });
    return count;
  }

  async getTodoList(index : number) {
    return await this.contract.methods
      .getAll()
      .call()
      .then((res: any) => {
        return res;
      });
  }
}
