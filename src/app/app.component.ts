import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  filter: 'all' | 'active' | 'done' = 'all';

  allItems: any[] = [];

  get items() {
    if (this.filter = 'all') {
      return this.allItems;
    }

    return this.allItems.filter((item) => {
      this.filter === 'done' ? item.done : !item.done;
    });
  }

  addTodo(text: string) {
    const item: any = {
      text,
      done: false,
    };
    if (text) {
      this.allItems.push(item);
    }
  }

  remove(item: any) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
}
