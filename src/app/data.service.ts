import { Item } from './shared/item';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Item[] = [];
  public stream$: BehaviorSubject<Item[]> = new BehaviorSubject(this.data);

  getData(filter: string): Item[] {
    if (filter === 'all') {
      return this.stream$.value;
    }
    return this.stream$.value.filter((item) =>
      filter === 'done' ? item.done : !item.done
    );
  }

  addData(text: string) {
    this.data.push(new Item(text));
  }

  removeData(item: Item) {
    this.data.splice(this.data.indexOf(item), 1);
  }
}
