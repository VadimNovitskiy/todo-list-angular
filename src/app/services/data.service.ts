import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Item } from '../models/item.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = '/items';
  itemsRef: AngularFireList<Item>;

  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list(this.dbPath);
  }

  getItems(): Observable<Item[]> {
    return this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  create(item: Item) {
    return this.itemsRef.push(item);
  }

  update(id: string, value: Item): Promise<void> {
    return this.itemsRef.update(id, value);
  }

  delete(id: string) {
    return this.itemsRef.remove(id);
  }
}
