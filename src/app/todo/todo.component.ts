import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Store } from '@ngxs/store';
import { Item } from '../models/item.model';
import { DataService } from '../services/data.service';
import { DeleteTodo, UpdateTodo } from '../store/app.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  editable = false;
  checked = false;

  @Input() item!: Item;

  constructor(private dataService: DataService, private store: Store) {}

  onEdit() {
    this.editable = !this.editable;
  }

  onClick(event: MatCheckboxChange) {
    const data = {
      text: this.item.text,
      done: event.checked,
    };
    if (this.item.id && this.item.done != event.checked) {
      this.store.dispatch(new UpdateTodo(this.item.id, data));
      // this.dataService
      //   .update(this.item.id, data)
      //   .then(() => console.log('The item was done successfully!'))
      //   .catch((err) => console.error(err));
    }
  }

  onSave(text: string) {
    const data = {
      text: text,
      done: this.item.done,
    };
    if (this.item.id) {
      this.store.dispatch(new UpdateTodo(this.item.id, data));
      // this.dataService
      //   .update(this.item.id, data)
      //   .then(() => console.log('The item was updated successfully!'))
      //   .catch((err) => console.error(err));
    }
    this.editable = !this.editable;
  }

  onRemove() {
    if (this.item.id) {
      this.store.dispatch(new DeleteTodo(this.item.id));
    }
    // this.remove.emit(this.item.id);
  }
}
