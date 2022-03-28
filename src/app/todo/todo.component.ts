import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Item } from '../models/item.model';
import { DataService } from '../servises/data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  editable = false;
  checked = false;

  @Input() item!: Item;

  @Output() remove = new EventEmitter();

  constructor(private dataService: DataService) {}

  onEdit() {
    this.editable = !this.editable;
  }

  onClick(event: MatCheckboxChange) {
    const data = {
      text: this.item.text,
      done: event.checked,
    };
    if (this.item.id && this.item.done != event.checked) {
      this.dataService
        .update(this.item.id, data)
        .then(() => console.log('The item was done successfully!'))
        .catch((err) => console.error(err));
    }
  }

  onSave(text: string) {
    const data = {
      text: text,
      done: this.item.done,
    };
    if (this.item.id) {
      this.dataService
        .update(this.item.id, data)
        .then(() => console.log('The item was updated successfully!'))
        .catch((err) => console.error(err));
    }
    this.editable = !this.editable;
  }

  onRemove() {
    this.remove.emit(this.item.id);
  }
}
