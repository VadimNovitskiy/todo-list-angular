import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../auxiliary_components/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  editable = false;

  @Input() item!: Item;

  @Output() remove = new EventEmitter();

  onEdit() {
    this.editable = !this.editable;
  }

  onSave(text: string) {
    this.item.text = text;
    this.editable = !this.editable;
  }

  onRemove() {
    this.remove.emit(this.item);
  }
}
