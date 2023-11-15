"use strict";

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

  const renderTodos = function (
    todos = [...defaultTodos, { priority: 4, isSelected: true }]
  ) {
    const todoElements = [];
    for (let todo of todos) {
      const args = todo.toPlainObject();
      projectElements.push(todoComponent(args));
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

  const closeTodoDialog = function () {
    todoDialog.close();
  };

  const handleProjectIdSelect = function (event) {
    // TODO
    const element = event.target;
  };

  const isButtonElement = function (element, filters) {
    // TODO
  };

  const handleNewTodoButton = function (event) {
    const element = event.target;
    if (element.dataset.buttonType !== "new-todo") return;

    openCreateTodoDialog();
  };

  const handleIsDoneCheckbox = function (event) {
    // TODO
  };

  const handleMoreButton = function (event) {
    // TODO
  };

  const handleLessButton = function (event) {
    // TODO
  };

  const handleEditButton = function (event) {
    const element = event.target;
    if (element.dataset.buttonType !== "edit") return;

    openEditTodoDialog(element.dataset.todoId);
  };

  const handleDeleteButton = function (event) {
    // TODO
  };

  const handleCancelButton = function (event) {
    // TODO
  };

  const handleSubmitButton = function (event) {
    // TODO
  };

  const attachEventListeners = function (containerElement) {
    // TODO
  };

  return {
    attachEventListeners,
  };
};

export default displayController;
