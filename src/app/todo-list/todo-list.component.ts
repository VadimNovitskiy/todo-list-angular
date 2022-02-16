import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../auxiliary_components/item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Input() text!: string;

  items: Item[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.items = this.dataService.getData();
  }

  addItem(text: string) {
    this.dataService.addData(text);
  }

  removeItem(item: Item) {
    this.dataService.removeData(item);
  }
}
