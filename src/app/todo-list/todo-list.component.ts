import { Component } from '@angular/core';
import { Item } from '../models/item.model';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { getAdditionalUserInfo } from 'firebase/auth';
import { TodoState } from '../store/app.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddTodo, FilterTodo, GetTodos } from '../store/app.actions';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MM YYYY',
  },
  display: {
    dateInput: 'DD MM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TodoListComponent {
  items?: Item[];
  userId = '';
  date = new FormControl(moment());

  @Select(TodoState.todos)
  todos!: Observable<Item[]>;

  constructor(
    private dataService: DataService,
    public authService: AuthService,
    private store: Store
  ) {
    this.authService.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        const dateValue = this.date.value.format('DD MM YYYY');
        this.store.dispatch(new GetTodos(user.uid, dateValue));
        // this.dataService.getItems(user.uid, dateValue).subscribe((data) => {
        //   this.items = data;
        // });
      }
    });
  }

  getItems(): void {
    const dateValue = this.date.value.format('DD MM YYYY');
    this.store.dispatch(new GetTodos(this.userId, dateValue));
    // this.dataService.getItems(this.userId, dateValue).subscribe((data) => {
    //   this.items = data;
    // });
  }

  addItem(text: string) {
    const item: Item = new Item();
    item.text = text;
    item.done = false;
    item.userId = this.userId;
    item.date = this.date.value.format('DD MM YYYY');
    this.store.dispatch(new AddTodo(item));
    // this.dataService.create(item);
  }

  renderItem(typeOfFilter: string): void {
    const dateValue = this.date.value.format('DD MM YYYY');
    if (typeOfFilter === 'all') {
      this.getItems();
    } else {
      this.store.dispatch(new FilterTodo(this.userId, dateValue, typeOfFilter));
      // this.dataService.getItems(this.userId, dateValue).subscribe((data) => {
      //   const filteredItems = data.filter((item) =>
      //   typeOfFilter === 'done' ? item.done : !item.done
      // );
      // this.items = filteredItems;
      // });
    }
  }

  onDateChange() {
    this.getItems();
  }
}
