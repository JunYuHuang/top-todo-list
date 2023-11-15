"use strict";

class Todo {
  #id;
  #projectId;
  #title;
  #description;
  #dueDate;
  #priority;
  #isDone;

  constructor(args) {
    const { id, projectId, title, description, dueDate, priority, isDone } =
      args;
    this.#id = id;
    this.#projectId = projectId;
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#isDone = isDone;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get projectId() {
    return this.#projectId;
  }

  set projectId(value) {
    this.#projectId = value;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    this.#title = value;
  }

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(value) {
    this.#dueDate = value;
  }

  get priority() {
    return this.#priority;
  }

  set priority(value) {
    this.#priority = value;
  }

  get isDone() {
    return this.#isDone;
  }

  set isDone(value) {
    this.#isDone = value;
  }

  toPlainObject() {
    return {
      id: this.#id,
      projectId: this.#projectId,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      isDone: this.#isDone,
    };
  }

  update(options) {
    if (options.hasOwnProperty("id")) this.#id = options.id;
    if (options.hasOwnProperty("projectId"))
      this.#projectId = options.projectId;
    if (options.hasOwnProperty("title")) this.#title = options.title;
    if (options.hasOwnProperty("description"))
      this.#description = options.description;
    if (options.hasOwnProperty("dueDate")) this.#dueDate = options.dueDate;
    if (options.hasOwnProperty("priority")) this.#priority = options.priority;
    if (options.hasOwnProperty("isDone")) this.#isDone = options.isDone;
  }
}

export default Todo;
