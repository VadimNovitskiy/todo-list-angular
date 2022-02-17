import { Item } from './auxiliary_components/item';

export class DataService {
  private data: Item[] = [];

  getData(filter: string): Item[] {
    if (filter === 'all') {
      return this.data;
    }
    return this.data.filter((item) =>
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
