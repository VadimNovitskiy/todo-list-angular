import { Item } from './auxiliary_components/item';

export class DataService {
  private data: Item[] = [];

  getData(): Item[] {
    return this.data;
  }

  addData(text: string) {
    this.data.push(new Item(text));
  }

  removeData(item: Item) {
    this.data.splice(this.data.indexOf(item), 1);
  }
}
