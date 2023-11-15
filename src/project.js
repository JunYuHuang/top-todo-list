"use strict";

class Project {
  #id;
  #name;

  constructor(args) {
    const { id, name } = args;
    this.#id = id;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  toPlainObject() {
    return {
      id: this.#id,
      name: this.#name,
    };
  }
}

export default Project;
