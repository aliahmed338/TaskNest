export class BaseFilter<T extends { title: string }> {
  items: T[];
  params: { title?: string };

  constructor(items: T[], params: { title?: string }) {
    this.items = items;
    this.params = params;
  }

  search() {
    if (this.params.title) {
      const searchTitle = this.params.title.toLowerCase();
      this.items = this.items.filter((item) =>
        item.title.toLowerCase().includes(searchTitle)
      );
    }
    return this;
  }
}
