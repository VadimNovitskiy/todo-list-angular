import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Item } from '../models/item.model';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = '';
  itemsRef!: AngularFireList<Item>;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) {}

  dbInfo(path?: string, date?: moment.Moment) {
    this.dbPath = `/items/${path}/${date}`;
    this.itemsRef = this.db.list(this.dbPath);
  }

  getItems(userId: string, date: moment.Moment): Observable<Item[]> {
    this.dbInfo(userId, date);
    return this.itemsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({
          id: c.payload.key,
          ...c.payload.val(),
        }))
      )
    );
  }

  create(item: Item) {
    this.dbInfo(item.userId, item.date);
    return this.itemsRef.push(item);
  }

  update(id: string, value: Item): Promise<void> {
    return this.itemsRef.update(id, value);
  }

  delete(id: string) {
    return this.itemsRef.remove(id);
  }
}
