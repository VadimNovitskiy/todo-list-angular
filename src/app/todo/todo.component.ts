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

  @Input() newItem!: string;

  @Output() remove = new EventEmitter();

  @Output() selected = new EventEmitter();

  saveItem(text: string) {
    if (!text) return;
    this.editable = false;
    this.item.text = text;
  }

  select() {
    this.selected.emit();
  }
}
