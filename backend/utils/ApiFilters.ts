import { ITask } from "../types/task";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";

interface FilterParams {
  category?: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in-progress" | "completed";
  date?: Date;
  view?: "day" | "week" | "month";
  title?: string;
}

export class ApiFilter {
  tasks: ITask[];
  params: FilterParams;
  grouped?: Record<string, ITask[]>;

  constructor(tasks: ITask[], params: FilterParams) {
    this.tasks = tasks;
    this.params = params;
  }

  filter() {
    // فلترة عادية
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

    // فلترة حسب اليوم / الاسبوع / الشهر
    if (this.params.date) {
      const date = new Date(this.params.date);
      let startDate: Date;
      let endDate: Date;

      if (this.params.view === "week") {
        startDate = startOfWeek(date, { weekStartsOn: 0 }); // 0 = الأحد / 1 = الاثنين
        endDate = endOfWeek(date, { weekStartsOn: 0 });
      } else if (this.params.view === "month") {
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
      } else {
        startDate = date;
        endDate = date;
      }
      
      // فلترة التاسكات حسب الرينج
      this.tasks = this.tasks.filter(
        (task) => task.start && task.start >= startDate && task.start <= endDate
      );  

      // Grouping
      this.grouped = {};
      let current = new Date(startDate);
      while (current <= endDate) {
        const key = format(current, "yyyy-MM-dd");
        this.grouped[key] = [];
        current.setDate(current.getDate() + 1);
      }

      this.tasks.forEach((task) => {
        if (task.start) {
          const taskDate = format(task.start, "yyyy-MM-dd");
          if (this.grouped![taskDate]) {
            this.grouped![taskDate].push(task);
          }
        }
      });
    }

    return this;
  }

  search() {
    if (this.params.title) {
      const searchTtitle = this.params.title.toLowerCase();
      this.tasks = this.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTtitle)
      );
    }
    return this;
  }
}
