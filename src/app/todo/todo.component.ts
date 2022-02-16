import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../auxiliary_components/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() item!: Item;

  @Output() remove = new EventEmitter();

  @Output() editable = new EventEmitter();

  onEdit(text: string) {
    this.editable.emit(text);
  }

  onRemove() {
    this.remove.emit(this.item);
  }
}
