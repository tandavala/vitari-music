export abstract class BaseFakeRepo<T> {
  protected _items: T[];

  constructor() {
    this._items = [];
  }

  public addFakeItem(t: T): void {
    let found = false;
    for (let item of this._items) {
    }
  }

  public removeFakeItem(t: T): void {
    this._items = this._items.filter((item) => !this.compareFakeItem(item, t));
  }

  abstract compareFakeItem(a: T, t: T): boolean;
}
