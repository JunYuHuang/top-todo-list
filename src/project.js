"use strict";

class Project {
  constructor(args) {
    const { id, name } = args;
    this.id = id;
    this.name = name;
  }

  get id() {
    return this.id;
  }

  get name() {
    return this.name;
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export default Project;
