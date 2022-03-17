import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Item {
  id?: string;
  text: string;
  done: boolean;
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  static url = 'https://todo-list-37f76-default-rtdb.firebaseio.com/items';

  constructor(private http: HttpClient) {}

  public data: Item[] = [];
  public stream$: BehaviorSubject<Item[]> = new BehaviorSubject(this.data);

  getData(filter: string): Item[] {
    if (filter === 'all') {
      return this.stream$.value;
    }
    return this.stream$.value.filter((item) =>
      filter === 'done' ? item.done : !item.done
    );
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${DataService.url}/.json`).pipe(
      map((item) => {
        const arr: Item[] = [];
        if (!item) {
          return [];
        }
        for (const key in item) {
          arr.push({ ...item[key], id: key });
        }
        return arr;
      })
    );
  }

  addData(text: string): Observable<Item> {
    const item: Item = { text: text, done: false };
    return this.http.post<CreateResponse>(`${DataService.url}.json`, item).pipe(
      map((res) => {
        return { ...item, id: res.name };
      })
    );
    // this.data.push(new Item(text));
  }

  removeData(item: Item): Observable<void> {
    return this.http.delete<void>(`${DataService.url}/${item.id}`);
  }
}
