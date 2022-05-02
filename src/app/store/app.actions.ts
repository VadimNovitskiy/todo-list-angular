import { Item } from 'src/app/models/item.model';

export class GetTodos {
  static readonly type = '[Todo] Get';

  constructor(public userId: string, public date: moment.Moment) {}
}

export class AddTodo {
  static readonly type = '[Todo] Add';

  constructor(public payload: Item) {}
}

export class UpdateTodo {
  static readonly type = '[Todo] Update';

  constructor(public id: string, public payload: Item) {}
}

export class FilterTodo {
  static readonly type = '[Todo] Filter';

  constructor(
    public userId: string,
    public date: moment.Moment,
    public typeOfFilter: string
  ) {}
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete';

  constructor(public id: string) {}
}
