export class GeneratedItem {
  name: string;
  path: string;
  module: string;

  id: number;
  types = {
    reducer: false,
    action: false,
    effect: false,
  };
  flags = {
    flat: true,
    group: false,
    test: false,
    spec: true
  };

  constructor(id: number = Math.floor(Math.random() * (500 - 100 + 1)) + 100) {
    this.id = id;
  }
}
