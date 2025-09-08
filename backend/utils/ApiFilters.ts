import { ITask } from "../types/task";

interface FilterParams {
  category?: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in-progress" | "completed";
  start?: Date;
  title?: string;
}

export class ApiFilter {
  tasks: ITask[];
  params: FilterParams;

  constructor(tasks: ITask[], params: FilterParams) {
    this.tasks = tasks;
    this.params = params;
  }

  filter() {
    if (this.params.category) {
      this.tasks = this.tasks.filter(
        (task) => task.category === this.params.category
      );
    }
    if (this.params.priority) {
      this.tasks = this.tasks.filter(
        (task) => task.priority === this.params.priority
      );
    }
    if (this.params.status) {
      this.tasks = this.tasks.filter(
        (task) => task.status === this.params.status
      );
    }
    if (this.params.start) {
      const startDate = new Date(this.params.start).toISOString().split("T")[0];
      this.tasks = this.tasks.filter(
        (task) =>
          task.start && task.start.toISOString().split("T")[0] === startDate
      );
    }

    return this;
  }

  search() {
    if (this.params.title) {
      const searchTtitle = (this.params.title as string).toLowerCase();
      this.tasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTtitle)
      );
    }
    return this;
  }
}
