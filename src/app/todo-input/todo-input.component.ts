import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  @Output() add = new EventEmitter();

  constructor(private dataService: DataService) {}

  addItem(text: string) {
    if (!text) {
      return;
    }
    this.add.emit(text);
  }
}
