"use strict";

const state = function (dependencies) {
  let isDebugMode = dependencies.hasOwnProperty("isDebugMode") ? true : false;
  const localStorageHelper = dependencies.localStorageHelper;
  const getRandomId = dependencies.getRandomId;
  const projectClass = dependencies.projectClass;
  const todoClass = dependencies.todoClass;
  const defaultProject = new projectClass({
    id: "project-defaultId",
    name: "Uncategorized",
  });
  let projects = dependencies.projects
    ? dependencies.projects
    : [defaultProject];
  let todos = dependencies.todos ? dependencies.todos : [];
  let currentProjectId = defaultProject.id;

  const log = function () {
    console.log("Current App State", {
      projects,
      todos,
      currentProjectId,
    });
  };

  const getCurrentProjectId = function () {
    return currentProjectId;
  };

  const setCurrentProjectId = function (id) {
    if (id === currentProjectId) return;
    currentProjectId = id;
    if (isDebugMode) log();
  };

  const isCurrentProject = function (project) {
    return project.id === currentProjectId;
  };

  const getTodos = function (filters = {}) {
    if (isDebugMode) log();
    if (filters.projectId) {
      return todos.filter((todo) => todo.projectId === filters.projectId);
    }
    if (filters.id) {
      return todos.filter((todo) => todo.id === filters.id);
    }
    return todos;
  };

  const setTodos = function (newTodos) {
    todos = newTodos;
    if (isDebugMode) log();
  };

  const createTodo = function (args) {
    args.id = `todo-${getRandomId()}`;
    todos.push(new todoClass(args));
    localStorageHelper.storeList(todoClass, todos);
    if (isDebugMode) log();
  };

  const updateTodo = function (options) {
    if (todos.length === 0 || !options.id) return;
    const pos = todos.findIndex((todo) => todo.id === options.id);
    if (pos === -1) return;

    todos[pos].update(options);
    localStorageHelper.storeList(todoClass, todos);
    if (isDebugMode) log();
  };

  const deleteTodo = function (id) {
    if (todos.length === 0) return;
    const pos = todos.findIndex((todo) => todo.id === id);
    if (pos === -1) return;

    todos.splice(pos, 1);
    localStorageHelper.storeList(todoClass, todos);
    if (isDebugMode) log();
  };

  const getProjects = function () {
    if (isDebugMode) log();
    return projects;
  };

  const setProjects = function (newProjects) {
    projects = newProjects;
    if (isDebugMode) log();
  };

  const createProject = function (args) {
    args.id = `project-${getRandomId()}`;
    projects.push(new projectClass(args));
    localStorageHelper.storeList(projectClass, projects);
    if (isDebugMode) log();
  };

  const doesProjectExist = function (name) {
    name = name.toUpperCase();
    if (isDebugMode) log();
    return projects.some((project) => project.name.toUpperCase() === name);
  };

  const loadFromLocalStorage = function () {
    const projectsInLS = localStorageHelper.getList(projectClass);
    const todosInLS = localStorageHelper.getList(todoClass);
    if (projectsInLS.length > 0) setProjects(projectsInLS);
    if (todosInLS.length > 0) setTodos(todosInLS);
    if (isDebugMode) log();
  };

  return {
    loadFromLocalStorage,
    getCurrentProjectId,
    setCurrentProjectId,
    isCurrentProject,
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
