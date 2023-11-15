"use strict";
import { format } from "date-fns";

const displayController = function (dependencies) {
  const datefns = dependencies.datefns;
  const state = dependencies.state;
  const localStorageHelper = dependencies.localStorageHelper;
  const projectComponent = dependencies.projectComponent;
  const todoComponent = dependencies.todoComponent;
  const priorityComponent = dependencies.priorityComponent;
  const projectIdSelect = dependencies.projectIdSelect;
  const todosRootDiv = dependencies.todosRootDiv;
  const todoDialog = dependencies.todoDialog;
  const todoForm = dependencies.todoForm;
  const todoFormHeader = dependencies.todoFormHeader;
  const todoActionTypeInput = dependencies.todoActionTypeInput;
  const todoIdInput = dependencies.todoIdInput;
  const todoTitleInput = dependencies.todoTitleInput;
  const todoDueDateInput = dependencies.todoDueDateInput;
  const todoPriorityInput = dependencies.todoPriorityInput;
  const todoDescriptionInput = dependencies.todoDescriptionInput;
  const defaultTodos = state.getTodos({
    projectId: state.getCurrentProjectId(),
  });
  const defaultPriorities = [
    { priority: 1, isSelected: false },
    { priority: 2, isSelected: false },
    { priority: 3, isSelected: false },
    { priority: 4, isSelected: true },
  ];

  const getPrioritiesList = function (selectedPriority) {
    const res = [];
    for (let i = 1; i <= 4; i++) {
      res.push({ priority: i, isSelected: i === selectedPriority });
    }
    return res;
  };

  const renderProjects = function (projects = state.getProjects()) {
    const projectElements = [];
    for (let project of projects) {
      const args = {
        id: project.id,
        name: project.name,
        isCurrent: state.isCurrentProject(project),
      };
      projectElements.push(projectComponent(args));
    }
    projectIdSelect.replaceChildren(...projectElements);
  };

  const renderTodos = function (todos = defaultTodos) {
    const todoElements = [];
    for (let todo of todos) {
      const args = todo.toPlainObject();
      todoElements.push(todoComponent(args));
    }
    todosRootDiv.replaceChildren(...todoElements);
  };

  const renderPriorities = function (priorities = defaultPriorities) {
    const priorityElements = [];
    for (let priority of priorities) {
      priorityElements.push(priorityComponent(priority));
    }
    todoPriorityInput.replaceChildren(...priorityElements);
  };

  const openCreateTodoDialog = function () {
    todoFormHeader.textContent = "Create Todo";
    todoActionTypeInput.value = "create";
    todoIdInput.value = "";
    todoTitleInput.value = "";
    todoDueDateInput.value = "";
    renderPriorities();
    todoDescriptionInput.textContent = "";
    todoDialog.showModal();
  };

  const openEditTodoDialog = function (todoId) {
    const todo = state.getTodos({ id: todoId })[0];
    const { id, title, dueDate, priority, description } = todo;
    todoFormHeader.textContent = "Edit Todo";
    todoActionTypeInput.value = "edit";
    todoIdInput.value = id;
    todoTitleInput.value = title;
    todoDueDateInput.value = dueDate;
    renderPriorities(getPrioritiesList(priority));
    todoDescriptionInput.textContent = description;
    todoDialog.showModal();
  };

  const handleProjectIdSelect = function (event) {
    // get the selected option value (projectId) from the select
    // set the currentProjectId to that one in the state
    // re-render the todos for the current projectId
    const element = event.target;
  };

  const handleNewTodoButton = function (event) {
    const element = event.target;
    if (element.dataset.buttonType !== "new-todo") return;

    openCreateTodoDialog();
  };

  const handleIsDoneCheckbox = function (event) {
    // get the checked value from the checkbox
    // update the state for this existing todo with this id
    // update the state in localStorage
    // re-render the todos for the current project
    const element = event.target;
    if (element.dataset.checkboxType !== "is-done") return;

    const todoId = element.dataset.todoId;
  };

  const handleMoreButton = function (event) {
    // do nothing if a more button was not clicked
    // get the todo id from the clicked button
    // expand the todo component's `.expanded-content` div
    // by toggling the CSS class `.max-h-0` on that div
    // hide itself (the button)
    // show the less button associated with the same todo (by id)
  };

  const handleLessButton = function (event) {
    // do nothing if a less button was not clicked
    // get the todo id from the clicked button
    // shrink the todo component's `.expanded-content` div
    // by toggling the CSS class `.max-h-0` on that div
    // hide itself (the button)
    // show the more button associated with the same todo (by id)
  };

  const handleEditButton = function (event) {
    const element = event.target;
    if (element.dataset.buttonType !== "edit") return;

    openEditTodoDialog(element.dataset.todoId);
  };

  const handleDeleteButton = function (event) {
    // do nothing if a delete button was not clicked
    // get the todo id from the clicked button
    // delete the todo with this id from the state
    // update the state in localStorage
    // re-render the todos in the current project
  };

  const handleCancelButton = function (event) {
    const element = event.target;
    if (element.dataset.buttonType !== "cancel") return;
    todoDialog.close();
  };

  const handleSubmitButton = function (event) {
    // do nothing if the submit button was not clicked
    // if the form was submitted as a create todo (has a hidden input with value "create")
    //   create a new todo with the data in the form
    //   update the state
    //   update the state in local storage
    //   if the new todo was created with a new project name
    //     create a new project with that name
    //     set the current project id with that new project id in the state
    //     update the state in the local storage
    //     re-render the projects select with that new project option selected
    //   re-render the todos under the selected project id
  };

  const attachEventListeners = function (containerElement) {
    // attach the following event handlers to the `containerElement`:
    // - click -> handleMoreButton()
    // - click -> handleLessButton()
    // - click -> handleEditButton()
    // - click -> handleDeleteButton()
    // - click -> handleNewTodoButton()
    // - click -> handleIsDoneCheckbox() ??
    // - change? -> handleProjectIdSelect()
  };

  return {
    renderProjects,
    renderTodos,
    renderPriorities,
    attachEventListeners,
  };
};

export default displayController;
