"use strict";

class Todo {
  constructor(args) {
    const { id, projectId, title, description, dueDate, priority, isDone } =
      args;
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone;
  }

  get id() {
    return this.id;
  }

  get projectId() {
    return this.projectId;
  }

  get title() {
    return this.title;
  }

  get description() {
    return this.description;
  }

  get dueDate() {
    return this.dueDate;
  }

  get priority() {
    return this.priority;
  }

  get isDone() {
    return this.isDone;
  }

  toPlainObject() {
    return {
      id: this.id,
      projectId: this.projectId,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.Priority,
      isDone: this.isDone,
    };
  }

  update(options) {
    if (options.hasOwnProperty("id")) this.id = options.id;
    if (options.hasOwnProperty("projectId")) this.projectId = options.projectId;
    if (options.hasOwnProperty("title")) this.title = options.title;
    if (options.hasOwnProperty("description"))
      this.description = options.description;
    if (options.hasOwnProperty("dueDate")) this.dueDate = options.dueDate;
    if (options.hasOwnProperty("priority")) this.priority = options.priority;
    if (options.hasOwnProperty("isDone")) this.isDone = options.isDone;
  }
}

export default Todo;
