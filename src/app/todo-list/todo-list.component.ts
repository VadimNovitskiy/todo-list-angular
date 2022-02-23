import { Component } from '@angular/core';
import { Item } from '../shared/item';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  filter = 'all';
  items = this.dataService.stream$.value;

  constructor(public dataService: DataService, private router: Router) {}

  renderItem(typeOfFilter: string): void {
    this.filter = typeOfFilter;
    this.items = this.dataService.getData(this.filter);
    this.router.navigateByUrl(`/${this.filter}`);
  }

  checkItem() {
    console.log('check');
    // this.items = this.dataService.getData(this.filter);
  }

  addItem(text: string) {
    this.dataService.addData(text);
    this.items = this.dataService.getData(this.filter);
  }

  removeItem(item: Item) {
    this.dataService.removeData(item);
    this.items = this.dataService.getData(this.filter);
  }
}
