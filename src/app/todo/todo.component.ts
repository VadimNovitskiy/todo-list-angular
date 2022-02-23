import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  editable = false;
  done = false;

  @Input() item!: Item;

  @Output() remove = new EventEmitter();
  @Output() check = new EventEmitter();

  onCheck() {
    console.log(this.item);
    this.check.emit();
  }

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
