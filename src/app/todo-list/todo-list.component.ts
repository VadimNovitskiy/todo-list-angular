import { Component, Input, DoCheck } from '@angular/core';
import { Item } from '../auxiliary_components/item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  filter: 'all' | 'active' | 'done' = 'all';

  @Input() text!: string;

  items: Item[] = [];

  constructor(private dataService: DataService) {}

  ngDoCheck(): void {
    this.items = this.dataService.getData(this.filter);
  }

  addItem(text: string) {
    this.dataService.addData(text);
  }

  removeItem(item: Item) {
    this.dataService.removeData(item);
  }
}
