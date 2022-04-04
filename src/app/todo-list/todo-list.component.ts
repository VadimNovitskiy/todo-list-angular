import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  filter = 'all';
  items?: Item[];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  addItem(text: string) {
    const item: Item = new Item();
    item.text = text;
    item.done = false;
    this.dataService.create(item);
  }

  renderItem(typeOfFilter: string): void {
    this.filter = typeOfFilter;
    this.router.navigateByUrl(`/${this.filter}`);
    if (this.filter === 'all' && this.filter === typeOfFilter) {
      this.getItems();
    } else {
      this.dataService.getItems().subscribe((data) => {
        const filteredItems = data.filter((item) =>
          this.filter === 'done' ? item.done : !item.done
        );
        this.items = filteredItems;
      });
    }
  }

  removeItem(id: string): void {
    this.dataService.delete(id);
  }
}
