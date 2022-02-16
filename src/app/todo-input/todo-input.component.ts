import { Component, Input } from '@angular/core';
import { Item } from '../auxiliary_components/item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  @Input() item!: Item;

  constructor(private dataService: DataService) {}

  addItem(text: string) {
    this.dataService.addData(text);
  }
}
