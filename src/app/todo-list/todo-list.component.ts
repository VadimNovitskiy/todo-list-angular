import { Component } from '@angular/core';
import { Item } from '../auxiliary_components/item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  filter: 'all' | 'active' | 'done' = 'all';

  allItems: Item[] = [];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }

    return this.allItems.filter((item) => {
      this.filter === 'done' ? item.done : !item.done;
    });
  }

  addTodo(text: string) {
    const item: Item = {
      text,
      done: false,
    };
    if (text) {
      this.allItems.push(item);
    }
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
}
