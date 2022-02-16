import { Component, OnInit } from '@angular/core';
import { Item } from '../auxiliary_components/item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  items: Item[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.items = this.dataService.getData();
  }

  // remove(item: Item) {
  //   this.allItems.splice(this.allItems.indexOf(item), 1);
  // }
}
