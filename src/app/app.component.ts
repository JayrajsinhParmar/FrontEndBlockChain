import { Component } from '@angular/core';
import { ContractService } from './services/contract.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  taskCount: number = 0;
  todoList: any;
  title = 'FrontEndBlockChain';

  constructor(private contactService: ContractService) {}
  connectToMetaMask() {
    this.contactService.connectAccount();
  }
  async getCurrenTaskList() {
    await this.contactService.getTaskCount().then((res) => {
      this.taskCount = Number(res);
    });
  }
  async getTodoList() {
    await this.contactService.getTodoList(this.taskCount).then((res: any) => {
      this.todoList = res;
    });
  }
}
