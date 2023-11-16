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
    id: "todo-dummyId1",
    projectId: "project-defaultId",
    title: "Dummy Todo Title",
    dueDate: "2024-02-02",
    priority: 3,
    description: "Dummy Todo Description",
    isDone: true,
  }),
  new Todo({
    id: "todo-dummyId2",
    projectId: "project-hoohee",
    title: "Hoo",
    dueDate: "2025-01-01",
    priority: 1,
    description: "hee",
    isDone: false,
  }),
];

let dummyProjects = [
  new Project({ id: "project-defaultId", name: "Uncategorized" }),
  new Project({ id: "project-hoohee", name: "Hoo Hee" }),
  new Project({ id: "project-emptyId", name: "Empty" }),
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
    todoActionTypeInput: document.querySelector("#todo-action-type"),
    todoIdInput: document.querySelector("#todo-id"),
    todoProjectIdInput: document.querySelector("#todo-project-id"),
    todoTitleInput: document.querySelector("#todo-title"),
    todoDueDateInput: document.querySelector("#todo-due-date"),
    todoPriorityInput: document.querySelector("#todo-priority"),
    todoDescriptionInput: document.querySelector("#todo-description"),
    projectDialog: document.querySelector("#project-dialog"),
    projectNameInput: document.querySelector("#project-name"),
  });

  // TESTING
  appDisplayController.attachEventListeners(window);
  appDisplayController.renderSelectProjects();
  appDisplayController.renderTodos();
});
