"use strict";

// IMPORTS
import { v4 as uuidv4 } from "uuid";
import Project from "./project";
import Todo from "./todo";
import state from "./state";
import {
  projectComponent,
  todoComponent,
  priorityComponent,
} from "./UIComponents";
import displayController from "./displayController";
import localStorageHelper from "./localStorageHelper";

if (process.env.NODE_ENV !== "production") {
  console.log("App running in dev mode!");
}

// TESTING

let dummyTodos = [
  new Todo({
    id: "todo-dummyId",
    projectId: "project-defaultId",
    title: "Dummy Todo Title",
    dueDate: "2024-02-02",
    priority: "3",
    description: "Dummy Todo Description",
    isDone: false,
  }),
  new Todo({
    id: "todo-dummyId",
    projectId: "project-hoohee",
    title: "Hoo",
    dueDate: "2025-01-01",
    priority: "1",
    description: "hee",
    isDone: false,
  }),
];

let dummyProjects = [
  new Project({ id: "project-defaultId", name: "Uncategorized" }),
  new Project({ id: "project-hoohee", name: "Hoo Hee" }),
];

const appState = state({
  getRandomId: uuidv4,
  projectClass: Project,
  todoClass: Todo,
  projects: dummyProjects,
  todos: dummyTodos,
});

window.addEventListener("load", function () {
  const appDisplayController = displayController({
    state: appState,
    localStorageHelper: localStorageHelper,
    projectComponent: projectComponent,
    todoComponent: todoComponent,
    priorityComponent: priorityComponent,
    projectIdSelect: document.querySelector("#project-id"),
    todosRootDiv: document.querySelector("#todos-root"),
    todoDialog: document.querySelector("#todo-dialog"),
    todoFormHeader: document.querySelector("#todo-form-header"),
    todoActionTypeInput: document.querySelector("#action-type"),
    todoIdInput: document.querySelector("#todo-id"),
    todoTitleInput: document.querySelector("#title"),
    todoDueDateInput: document.querySelector("#due-date"),
    todoPriorityInput: document.querySelector("#priority"),
    todoDescriptionInput: document.querySelector("#description"),
  });

  // TESTING

  appDisplayController.renderProjects();
  appDisplayController.renderTodos();
});
