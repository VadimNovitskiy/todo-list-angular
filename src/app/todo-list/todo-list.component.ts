import { Component } from '@angular/core';
import { Item } from '../shared/data.service';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  filter = 'all';
  items: Item[] = [];

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.dataService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  renderItem(typeOfFilter: string): void {
    this.filter = typeOfFilter;
    this.items = this.dataService.getData(this.filter);
    this.router.navigateByUrl(`/${this.filter}`);
  }

  addItem(text: string) {
    this.dataService.addData(text).subscribe();
  }

  removeItem(item: Item) {
    this.dataService.removeData(item).subscribe();
  }
}
