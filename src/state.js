"use strict";

const state = function (dependencies) {
  const getRandomId = dependencies.getRandomId;
  const projectClass = dependencies.projectClass;
  const todoClass = dependencies.todoClass;
  const defaultProject = new projectClass({
    id: "todo-default",
    name: "Uncategorized",
  });
  let projects = dependencies.projects
    ? dependencies.projects
    : [defaultProject];
  let todos = dependencies.todos ? dependencies.todos : [];
  let currentProjectId = defaultProject.id;

  const setProjectId = function (id) {
    if (id === currentProjectId) return;
    currentProjectId = id;
  };

  const getTodos = function (filters = {}) {
    if (!filters.projectId) return todos;
    if (filters.projectId) {
      return todos.filter((todo) => todo.projectId === filters.projectId);
    }
    return todos;
  };

  const setTodos = function (newTodos) {
    todos = newTodos;
  };

  const createTodo = function (args) {
    args.id = `todo-${getRandomId()}`;
    todos.push(new todoClass(args));
  };

  const updateTodo = function (options) {
    if (todos.length === 0 || !options.id) return;
    const pos = todos.findIndex((todo) => todo.id === options.id);
    if (pos === -1) return;

    todos[pos].update(options);
  };

  const deleteTodo = function (id) {
    if (todos.length === 0) return;
    const pos = todos.findIndex((todo) => todo.id === id);
    if (pos === -1) return;

    todos.splice(pos, 1);
  };

  const getProjects = function () {
    return projects;
  };

  const setProjects = function (newProjects) {
    projects = newProjects;
  };

  const createProject = function (args) {
    args.id = `project-${getRandomId()}`;
    projects.push(new projectClass(args));
  };

  const doesProjectExist = function (name) {
    return projects.some((project) => project.name === name);
  };

  return {
    setProjectId,
    getTodos,
    setTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getProjects,
    setProjects,
    createProject,
    doesProjectExist,
  };
};

export default state;
