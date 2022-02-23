import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  @Output() add = new EventEmitter();

  addItem(text: string) {
    if (!text) {
      return;
    }
    this.add.emit(text);
  }
}
